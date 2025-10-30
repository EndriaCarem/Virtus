<div align="center">
  <img src="assets/logo.svg" alt="Logo Copiloto de Relatórios" width="520" />
  <h1>Virtus</h1>
  <p><em>Sistema de Formatação de documentos RA, PPB, MOVER  </em></p>
</div>

## Visão Geral
Este projeto é um **Copiloto de Relatórios** que atua como assistente para analistas, com foco na **formatação** e **adequação** de relatórios técnicos de incentivos fiscais
(**Regime Automotivo**, **Lei de Informática** e **MOVER**). A PoC automatiza a verificação de conformidade e a padronização do texto, permitindo que o profissional se
concentre na análise do conteúdo.

## Funcionalidades
- **Entrada flexível**: cola de texto via área de transferência ou upload de arquivo.
- **Reformatação automática**: melhora clareza, padroniza estilos e tom profissional.
- **Checklist de conformidade**: extrai sugestões práticas alinhadas a regulamentos (Regime Automotivo, Lei de Informática, MOVER).
- **Interface moderna**: glassmorphism, tema dinâmico (claro/escuro) — com **gradiente suave** no claro e **céu estrelado** no escuro.
- **Resultados estruturados**: separação entre *texto ajustado* e *recomendações de conformidade*.

## Experiência de Usuário
A aplicação adota **glassmorphism** e **temas dinâmicos**. Em **modo claro**, um gradiente suave reforça a leitura;
em **modo escuro**, um **fundo de céu estrelado** torna o uso noturno mais imersivo.

## Arquitetura (alto nível)
```mermaid
flowchart LR
  U[Usuário] --> UI[Frontend (React/TypeScript)]
  UI --> CLIP[Entrada: clipboard / upload]
  UI --> API[(Serviço de análise)]
  API --> GEM[API Google Gemini]
  GEM --> API
  API --> UI
  UI --> OUT[Saída: Texto Ajustado + Recomendações]
