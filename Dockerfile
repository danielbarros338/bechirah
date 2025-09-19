# Dockerfile para aplicação Nuxt.js
# Multi-stage build para otimizar o tamanho da imagem

# Stage 1: Dependencies
FROM node:22.18-alpine AS deps
WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Copiar arquivos de configuração de dependências
COPY package*.json ./
COPY yarn.lock* ./
COPY pnpm-lock.yaml* ./

# Instalar dependências
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 2: Builder
FROM node:22.18-alpine AS builder
WORKDIR /app

# Copiar dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Gerar build de produção
RUN npm run build

# Stage 3: Runner (Produção)
FROM node:22.18-alpine AS runner
WORKDIR /app

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output

# Mudar para usuário não-root
USER nuxtjs

# Expor porta
EXPOSE 3000

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Comando para iniciar a aplicação
CMD ["node", ".output/server/index.mjs"]