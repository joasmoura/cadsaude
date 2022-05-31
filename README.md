# cadsaude

Este sistema foi desenvolvido para cadastro de profissionais da saúde

## Recommended IDE Setup

# Vuex
- npm install vuex@next --save

# Bootstrap 5
- npm install bootstrap
- npm i @popperjs/core

# axios
- npm install --save axios vue-axios

# Veevalidate
- npm install vee-validate --save

# Mascara de formulário
- npm install maska

# Mascara de moeda
- npm install vue-currency-input

## Customize configuration

- no arquivo src/main.js encontra-se importação das bibliotecas instaladas
- Também encontra-se no arquivo src/main.js as regras de verificação dos campos dos formulários através da diretiva rules
- No arquivo src/configs/api.js está a configuração da url base do axios
- No arquivo src/mixins/moeda.js existe um método para tratar valores em real

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
