<h1 align="center">
    <img alt="upfi" title="upfi" src="/assets/upfi-logo.svg" width="250px" />
</h1>

<!-- TABLE OF CONTENTS -->

<h5 align="center"> 
<a href="#sobre">Sobre</a>
   •   <a href="#tecnologias">Tecnologias</a> 
   •   <a href="#roadmap">Roadmap</a> 
   •   <a href="#instalação">Instalação</a> 
   •   <a href="#layout">Layout</a> 
   •   <a href="#visão-do-projeto">Visão do projeto</a>
   •   <a href="#agradecimento">Agradecimento</a> 
   •   <a href="#licença">Licença</a>     
   •   <a href="#autor">Autor</a> 
</h5>

## Sobre

<h4>Upfi é uma aplicação web para vc armazenar e gerenciar suas imagens.</h4>

Esta aplicação é o resultado da realização do desafio obrigatório `Upload com imagens` do módulo quatro na trilha ReactJS do treinamento Ignite  da Rocketseat 💜. O desafio consiste em:
- Implementar a interface da aplicação utilizando Chakra UI;
- Utilizar o React Query para buscar, armazenar em cache e atualizar os dados.
- Trabalhar com formulários usando o React Hook Form.

Outros pontos também foram trabalhados como scroll infinito e obervadores, troca de temas, imagens favoritas, gerenciamento de imagens e responsividade.

Todas as imagens na aplicação podem ser encontradas em [Unsplash](https://unsplash.com/).

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Figma](https://www.figma.com/)
- [Chakra-UI](https://chakra-ui.com/)
- [React Query](https://react-query.tanstack.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Imgbb](https://pt-br.imgbb.com/)
- [supabase](https://supabase.io/)

## Roadmap

- [x] Renderizar um componente de carregamento enquanto os dados estão sendo buscados do supabase;
- [x] Renderizar um componente de erro se houve erro ao carregar os dados do supabase;
- [x] Renderizar imagens em grid;
- [x] Ver imagem;
- [x] Abrir imagem original em outra aba do navegador;
- [x] Adicionar imagens;
- [x] Tema claro/escuro;
- [x] Scroll infinito;
- [x] Excluir imagens;
- [x] Atualizar imagens;
- [x] Favoritar/Desfavoritar imagem;
- [x] Criar álbum de favoritos; 
- [x] Adicionar responsividade:
  - [x] 320px
  - [x] 480px
  - [x] 768px
  - [x] 1024px
  - [x] 1440px
  - [x] Para telas maiores que 1440px, largura máxima fixada em 1440px.

## Instalação

- ### **Pré-requisitos**
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador.
  - É **necessário** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
  - É **necessário** ter uma conta no imgbb.
  - É **necessário** ter uma conta no supabase.

- ### **Próximo passo**
1. Faça um clone deste repositório:
   ```sh
   $ git clone https://github.com/die-goncalves/ignite-reactjs-modulo04-desafio02-upfi
   ```

2. Instale as depêndencias:
   ```sh
   # Entre no diretório do repositório clonado
   $ cd ignite-reactjs-modulo04-desafio02-upfi
   # Instale as dependências do projeto.
   $ yarn #ou $ npm install
   ```

3. Crie na raiz do projeto o arquivo **.env.local**.<br/>
   ```sh
   # .env.local
   NEXT_PUBLIC_IMGBB_API_KEY=
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```
   Para preencher a chave da API do imgbb clique neste [link](https://api.imgbb.com/) crie sua chave e a coloque no arquivo .env.local.
   Para preencher as chaves do supabase siga este [guia](https://supabase.io/docs/guides/with-nextjs#get-the-api-keys).
    
4. Execute a aplicação
   ```sh
   $ yarn dev #ou $ npm run dev
   # A aplicação inciará na porta:3000 - acesse <http://localhost:3000>
   ```

## Layout

<div>
    <p>A interface da aplicação foi baseada no layout fornecido a seguir. Para observar o layout no Figma acesse:</p>
    <p align="center">
        <a href="https://www.figma.com/file/WNQI8DYriVQ4XpTQoejzuc/Desafio-2-M%C3%B3dulo-4-ReactJS-(BKP)?node-id=0%3A1">
            <img alt="Link do site" src="https://img.shields.io/static/v1?label=Figma&message=layout&color=FFC700&style=flat-square&logo=figma" />
        </a>
    </p>
</div>

## Visão do projeto

<img src="/assets/upfigif.gif" alt="upfi-gif">
O GIF abaixo mostra como a aplicação responde para larguras de 320px, 480px, 768px, 1024px e 1440px. Para cada largura as seguintes operações são realizadas: ver, adicionar, favoritar, atualizar e excluir imagem.   
<img src="/assets/responsivegif.gif" alt="responsive-gif">

## Agradecimento

<table width="100%" align="center">
    <tr>
        <th>
            <a href="https://rocketseat.com.br/">
                <img width="150" height="150" src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4">
                <br /><sub><b>Rocketseat</b></sub>
            </a>
        </th>
        <th>
            <img width="150" height="150" src="/assets/ignite-logo.svg">
            <br /><sub><b>Ignite</b></sub>
        </th>
        <th>
            <a href="https://github.com/diego3g">
                <img width="150" height="150" src="https://avatars.githubusercontent.com/u/2254731?s=400&u=4fcc8ca9672eeb41ea800271831b7c687bc17054&v=4">
                <br /><sub><b>diego3g (Diego Fernandes)</b></sub>
            </a>
        </th>
    </tr>
</table>

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

Feito por Diego Gonçalves, contato:

[![Badge](https://img.shields.io/static/v1?label=Linkedin&message=Diego%20Gonçalves&color=208BEE&style=flat-square&logo=linkedin&link=https://www.linkedin.com/in/diego-goncalves1990)](https://www.linkedin.com/in/diego-goncalves1990)
[![Badge](https://img.shields.io/static/v1?label=Gmail&message=die.goncalves1990@gmail.com&color=EA5134&style=flat-square&logo=gmail&link=mailto:die.goncalves1990@gmail.com)](mailto:die.goncalves1990@gmail.com)