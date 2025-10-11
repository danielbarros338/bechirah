# Bechirah – Gestor Inteligente de Currículos

Bechirah é uma plataforma da Logos Next para triagem e classificação inteligente de currículos. O sistema transforma os critérios informados pelo recrutador em orientações claras para um agente de IA, que analisa cada candidatura, explica sua decisão e ajuda o time de seleção a priorizar entrevistas com mais assertividade.

## 🧠 O Que a Plataforma Entrega
- Recolhe requisitos da vaga e pontos de atenção diretamente com o usuário responsável pela seleção.
- Recebe currículos em lote ou individualmente e reconhece informações relevantes automaticamente.
- Gera uma classificação ordenada, acompanhada de justificativas simples de entender.
- Destaca alertas quando um currículo exige validação manual ou não cumpre requisitos obrigatórios.
- Mantém registro dos pareceres emitidos para facilitar auditoria e feedback aos candidatos.

## 🧭 Jornada do Usuário
- **Configuração da vaga**: o recrutador informa requisitos mínimos, diferenciais e peso de cada critério.
- **Envio de currículos**: arquivos são carregados e vinculados à vaga ativa.
- **Classificação automática**: o agente de IA interpreta cada currículo, aplica os critérios e monta um ranking.
- **Análise humanizada**: o recrutador consulta as justificativas, ajusta prioridades quando necessário e agenda próximos passos.

## 🤖 Funcionamento da IA
- Critérios coletados alimentam o agente com instruções orientadas para avaliação justa e consistente.
- Cada currículo recebe um parecer detalhado, permitindo que o recrutador entenda a decisão sem precisar revisar manualmente todos os documentos.
- Feedbacks registrados ajudam a aprimorar futuras triagens e alinhar critérios entre equipes.

## 🔐 Segurança e Privacidade
- Acesso disponível apenas para colaboradores autenticados da Logos Next.
- Informações sensíveis ficam protegidas por autenticação de sessão e políticas internas de armazenamento seguro.
- Recomenda-se uso de canais criptografados para envio e backup de currículos.

## 📈 Estado Atual e Próximos Passos
- Módulos principais de autenticação, cadastro de vaga e consulta de currículos já estão implementados.
- Integrações adicionais com ferramentas de RH e exportação de relatórios estão previstas nas próximas iterações.
- Ainda não há testes automatizados implementados; validação é feita manualmente a cada entrega.

## 🛠️ Termos Técnicos e Stack
- Interface construída em Nuxt 3 com Vue e TypeScript.
- Estilização com Tailwind CSS.
- API interna baseada em rotas serverless (`server/api/**`).
- Composables (`app/composable/**`) cuidam de autenticação, carregamento de currículos e chamadas ao agente de IA.

## � Como Rodar Localmente
1. Instale as dependências:
	```bash
	yarn install
	```
2. Configure as variáveis de ambiente (credenciais de autenticação e chave do agente de IA).
3. Execute o servidor de desenvolvimento:
	```bash
	yarn dev
	```
4. Acesse `http://localhost:3000` e faça login com um usuário autorizado.

## 📄 Licença
Este repositório está licenciado sob a **Licença Proprietária Logos Next**. O uso é restrito à Logos Next e colaboradores autorizados. Veja `LICENSE` para condições completas.

## 📬 Contato
- Equipe Logos Next • `contato@logosnext.com`
- Abra uma issue interna ou contate o time de engenharia para suporte e sugestões.
