# loyalty-resto-frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Build docker image for ADM64

docker build --platform amd64 -t appeiron/hub-frontend .


## NGINX certificates docs:
https://ongkhaiwei.medium.com/generate-lets-encrypt-certificate-with-dns-challenge-and-namecheap-e5999a040708


!!! TO RENEW CERTIFICATES IS NEEDED DO IT MANUALLY, repeating all this process

certbot certonly --manual --preferred-challenges=dns --email "appeiron.manager@gmail.com" --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d "zentreapp.com"


accept all

ADD 2 TXT RECORD in namecheap, in the host is not needed put the domain name, (be aware because letsencrypt it will do the domain name added at last of the host name)

cp /etc/letsencrypt/live/zentreapp.com/privkey.pem /root/certs/zentreapp.com.key
cp /etc/letsencrypt/live/zentreapp.com/fullchain.pem /root/certs/zentreapp.com.crt



<!-- Zentre.app apps -->

Nomada:

certbot certonly --manual --preferred-challenges=dns --email "appeiron.manager@gmail.com" --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d "zentre.app" -d "*.zentre.app"

cp /etc/letsencrypt/live/zentre.app/privkey.pem /root/certs/zentre.app.key

cp /etc/letsencrypt/live/zentre.app/fullchain.pem /root/certs/zentre.app.crt