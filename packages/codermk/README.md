<div align='center'>
  <img height="60" src="https://raw.githubusercontent.com/dsaza/codermk/main/code-labs.svg">
  <h1>Codermk</h1>
  <i>Un workflow ideal para maquetar.</i>
</div>

### 📋 Índice

- [Instalación](#-instalación)
- [Desarrollo](#-desarrollo)
- [Compilación](#-compilación)
- [Data](#-data)
  - [¿Cómo usar?](#cómo-usar)
  - [Estructura de archivos JSON](#estructura-de-archivos-json)

- [Motor de plantillas](#-motor-de-plantillas)
  - [¿Qué es Nunjucks?](#qué-es-nunjucks)
  - [¿Qué extensión de archivos utilizar?](#qué-extensión-de-archivos-utilizar)
  - [¿Qué extensión de Visual Studio Code instalar?](#qué-extensión-de-visual-studio-code-instalar)
  - [Estructura de archivos](#estructura-de-archivos)
  - [Constantes Nunjucks](#constantes-nunjucks)
  - [Nunjucks mixins](#nunjucks-mixins)

- [Preprocesador CSS](#-preprocesador-css)
  - [¿Qué es SASS?](#qué-es-sass)
  - [Metodología recomendada (SuitCSS)](#metodología-recomendada-suitcss)
  - [Estructura de archivos SCSS](#estructura-de-archivos-scss)
  - [SASS functions](#sass-functions)
  - [SASS mixins](#sass-mixins)

- [ESCMAScript](#-ecmascript)
  - [¿Qúe es Esbuild?](#qué-es-esbuild)
  - [Estructura de archivos JS](#estructura-de-archivos-js)
  - [Constantes JS](#constantes-js)
 
- [Font icons](#-font-icons)
  - [Estructura de iconos](#estructura-de-iconos)
  - [¿Cómo usar iconos SVG?](#cómo-usar-iconos-svg)

<br>

## 🧰 Instalación
- Ejecutar el comando.

```sh
npm create coder-front-app@latest
```

- Escribir el nombre del proyecto.
- Seleccionar la opción `Codermk`.
- Instalar dependencias.

```sh
cd name-project
npm install
```

**[⬆ Volver al índice](#-índice)**

## 💻 Desarrollo
- Ejecutar el comando:

```sh
npm run dev
```

**[⬆ Volver al índice](#-índice)**

## 🪅 Compilación
- Ejecutar el comando:

```sh
npm run build
```

La maqueta final será guardada en la carpeta `dist`, es posible cambiar el nombre de la carpeta en el archivo `codermk.json`.

**[⬆ Volver al índice](#-índice)**

## 📀 Data
Para que el uso de información general sea más óptima de utilizar se plantea el uso de archivos JSON que contengan los datos relevantes. El motor de plantillas HTML y javascript tendrán acceso a la información de los JSON mediante constantes.

### ¿Cómo usar?
Cada archivo JSON hará la función de coleccionar los datos, tal como lo hace una tabla en SQL.

### Estructura de archivos JSON
Los archivos JSON serán creados dentro de la carpeta `data`.

Por defecto ya existe una colección creada llamada `site.json`.

```
data  
| site.json
```

La colección `site.json` contiene una propiedad `title` la cual corresponde al título de la página HTML del sitio a maquetar.

**[⬆ Volver al índice](#-índice)**

## 🛵 Motor de plantillas
Al utilizar HTML en el momento de maquetar se presentan varios problemas, código repetitivo, archivos extensos y desorden. `Nunjucks` aportará super poderes para hacer la estructura de la maqueta más fácil.

### ¿Qué es Nunjucks?
Es un motor de plantillas rico y potente para JavaScript muy inspirado en [jinja2](https://jinja.palletsprojects.com/en/3.1.x/) (Motor de plantillas para [Django](https://www.djangoproject.com/)). Permite características como autoescapado, herencia de bloques, macros, control asíncrono y muchos más.  

Se recomienda leer la documentación de Nunjucks [aquí](https://mozilla.github.io/nunjucks/templating.html#variables).

### ¿Qué extensión de archivos utilizar?
Nunjucks es muy inspirado en [jinja2](https://jinja.palletsprojects.com/en/3.1.x/) pero también tiene una gran similitud con un motor de plantillas para PHP llamado [Twig](https://twig.symfony.com/). Cómo la gran mayoría de editores de código desconocen la estensión `.njk` se recomienda utilizar la extensión `.twig` para todos los archivos que se creen.

### ¿Qué extensión de Visual Studio Code instalar?
Se recomienda instalar la extensión [Twig Language](https://marketplace.visualstudio.com/items?itemName=mblode.twig-language) del autor _[mblode](https://marketplace.visualstudio.com/publishers/mblode)_. Esta extensión dará soporte para la sintaxix y varios snippets.

### Estructura de archivos
```
src
└── views
|   ├── _pages
|   ├── components
|   ├── layouts
|   └── partials
```

Todo lo relacionado a `Nunjucks` estará ubicado en la carpeta `src/views` y se distribuirá de la siguiente manera:

- `_pages`: esta es la carpeta principal ya que los archivos que se encuentren allí serán los compilados como HTML y los que conformarán la maqueta.
- `components`: aquí se ubicarán los macros o componentes dinámicos de la maqueta.
- `layouts`: aquí se ubicarán los esqueletos de la maqueta que heredarán las páginas.
- `partials`: aquí se guardarán trozos de código HTML los cuales pueden ser reutilizados en cualquier parte.

### Constantes Nunjucks
Como se mencionó anteriormente, las colecciones JSON de la carpeta `data` podrán ser usadas en el motor de plantillas, para ello existe una constante `__mkdata` la cual es un objeto que contiene cada colección JSON como propiedad. Por ejemplo, si se desea utilizar la propiedad `title` de la colección `site.json` se puede acceder mediante `__mkdata.site.title`.

### Nunjucks mixins
La manera en que se linkean los assets como imágenes, archivos css, archivos js, páginas HTML locales y demás; se debé hacer mediante mixins ya construidos para su uso. A continuación se listan los mixins:

| Mixin | Descripción | Parámetros | Ejemplo |
| ----- | ----------- | ---------- | ------- |
| **public** | Se usa para linkear archivos que se encuentren dentro de la carpeta `public`. | - `linkFromPublic`: _(string)_ ruta del archivo tomando como raíz la carpeta `public` | `public('favicon.ico')` |
| **style** | Se usa para linkear los archivos `.scss` que serán compilados. | - `fileScss`: _(string)_ nombre del archivo `.scss` a compilar | `style('main.scss')` |
| **module** | Se usa para linkear los archivos `.js` que serán compilados. | - `fileJs`: _(string)_ nombre del archivo `.js` a compilar | `module('main.js')` |
| **page** | Se usa para linkear páginas `.twig` hermanas. | - `namePage`: _(string)_ nombre de la página sin la extensión <br> - `optionsURL`: _(string)_ _(optional)_ información adicional como `#hash` o `?parameters` | - `page('.') // index.html` <br> - `page('nosotros') // nosotros.html` <br> - `page('nosotros', '#historia') // nosotros.html#historia` <br> - `page('nosotros', '/?lang=en') // nosotros.html/?lang=en`|
| **isDev** | _(Adicional)_ Esta función retorna un `boolean` y es útil si se desea saber si la maqueta está en desarrollo. | - | `isDev()` |
| **isProduction** | _(Adicional)_ Esta función retorna un `boolean` y es útil si se desea saber si la maqueta está en producción. | - | `isBuild()` |

**[⬆ Volver al índice](#-índice)**

## 💅 Preprocesador CSS
Las hojas de estilo de un sitio web cada vez son más complejas y difíciles de mantener. En este punto es dónde un preprocesador de CSS puede ser de gran utilidad y SASS permite emplear funcionalidades que no existen en CSS.

### ¿Qué es SASS?
SASS es un preprocesador de CSS compatible con todas sus versiones. Por lo tanto, se trata de una herramienta utilizada por los desarrolladores web para traducir un código de hojas de estilo no estándar a un código CSS estándar, legible por la mayoría de los navegadores. La principal utilidad de SASS es la de hacer más simple la escritura del código CSS, además de brindar diversas utilidades que a día de hoy el CSS no puede ofrecer.

Se recomienda ver su documentación [aquí](https://sass-lang.com/guide).

### Metodología recomendada (SuitCSS)
SUIT comprende Utilidades y Componentes. Dentro de los componentes puede haber modificadores, descendientes y estados.  

SUIT utiliza una combinación de la notación de Pascal (PascalCase), Mayúsculas y minúsculas(camelCase) y guiones. Sus convenciones imponen un límite en el número a veces confuso de guiones y guiones bajos que pueden aparecer en BEM. Por ejemplo, la clase BEM `.search-form__text-field` sería `.SearchForm-textField` en SUIT.  

#### - Utilidades
Las utilidades manejan la estructura y el estilo posicional, y están escritas de tal manera que se pueden aplicar en cualquier parte de un componente. Tienen el prefijo `u-` y están escritos en mayúsculas y minúsculas. Por ejemplo `.u-clearFix`, `.u-textCenter` y `.u-displayNone`.

#### - Componentes
Un componente en SUIT ocupa el lugar de un bloque en BEM. Los componentes siempre están escritos en mayúsculas y minúsculas y son solo una parte de SUIT que usa mayúsculas y minúsculas, lo que los hace fáciles de identificar. Por ejemplo, `.SearchForm`.

#### - Espacio de nombres de componentes
Opcionalmente, los componentes pueden tener un prefijo con un espacio de nombres y un solo guión `nmsp-` para garantizar que se eviten conflictos, por ejemplo `.nmsp-SearchForm`.

#### - Descendientes
Un descendiente en SUIT reemplaza un elemento en BEM. Utiliza un solo guión `-` y está escrito en mayúsculas y minúsculas. Por ejemplo `.SearchForm-header`, `.SearchForm-textField` y `.SearchForm-submitButton`.

#### - Modificadores
SUIT usa modificadores al igual que BEM, sin embargo, su función está más estrictamente controlada. Un modificador SUIT generalmente solo se aplica directamente a un componente, no a un descendiente. Tampoco debe usarse para representar cambios de estado, ya que SUIT tiene una convención de nomenclatura dedicada para los estados.

Los modificadores están escritos en mayúsculas y minúsculas y están precedidos por dos guiones `--`. Por ejemplo `.SearchForm--advanced` y `.SearchForm--required`.

#### - Estado
Las clases de estado se pueden usar para reflejar los cambios en el estado de un componente. Esto les permite diferenciarse claramente de los modificadores, que reflejan la modificación de la apariencia base de un componente independientemente del estado. Si es necesario, también se puede aplicar un estado a un descendiente.

Los estados tienen el prefijo `is-` y están escritos en mayúsculas y minúsculas. También siempre se escriben como clases contiguas. Por ejemplo `.SearchForm.is-invalid`.

### Estructura de archivos SCSS
SASS permite crear dos tipos de extensiones para sus archivos: `.sass` y `.scss`. La estructura de archivos en este caso será con la extensión `.scss`. Todo lo relacionado a `SASS` estará ubicado en la carpeta `src/scss`.

```
src
└── scss
|   ├── _entries
|   ├── components
|   ├── config
|   ├── core
|   ├── extends
|   ├── fonts
|   ├── functions
|   ├── mixins
|   └── utilities
```

- `_entries`: Esta es la carpeta principal ya que todos los archivos que se encuentren dentro de ella serán los que se compilan.
- `components`: aquí se ubicarán los estilos para los componentes.
- `config`: aquí se ubicarán las variables que utilizará el proyecto.
- `core`: contiene los archivos que aplican estilos globales a la maqueta, por defecto ya contiene un [formateador de estilos](https://github.com/sindresorhus/modern-normalize), que es el mismo que utiliza [TailwindCSS](https://tailwindcss.com/).
- `extends`: [Ver documentación](https://sass-lang.com/documentation/at-rules/extend).
- `fonts`: Aquí se guardan todas las importaciones de fuentes que necesite la maqueta.
- `functions`: [Ver documentación](https://sass-lang.com/documentation/at-rules/function).
- `mixins`: [Ver documentación](https://sass-lang.com/documentation/at-rules/mixin).
- `utilities`: Contiene archivos que crean las clases utilitarias necesarias.

### SASS functions
Se encuentran `functions` previamente hechos y tienen funcionalidades extras para contruir los estilos de la maqueta de una mejor manera.

| Function | Descripción | Parámetros | Ejemplo |
| ----- | ----------- | ---------- | ------- |
| **public_url** | Reemplazará la función `url` de CSS y esta hará referencia a los archivos ubicados en la carpeta `public`. | - `linkFromPublic`: _(string)_ ruta del archivo tomando como raíz la carpeta `public` | `public_url('favicon.ico')` |
| **rempi** | Se usa para usar formato `rem` como si fuera `px`. | - `sizePx`: _(number)_ valor de píxeles a utilizar | `rempi(20) // 20px` |

### SASS mixins
Se encuentran `mixins` previamente construidos y tienen funcionalidades extras para ahorrar tiempo en el momento de contruir los estilos.

| Mixin | Descripción | Parámetros | Ejemplo |
| ----- | ----------- | ---------- | ------- |
| **icon** | Retorna las propiedades requeridas para utilizar un `icon-font` desde los pseudo-elementos `::after` o `::before`. | - `idIcon`: _(number)_ id del icono el cual corresponde al número que se le otorgó en el momento de crear el archivo SVG | `@include icon(0) // [00]code-labs.svg` |
| **scrollbar** | Customiza el scrollbar de la página o de un contenedor. | - `colorBar`: CSS Color <br> - `colorBackground`: CSS Color <br> - `size`: _(number)_ CSS Size in pixels | `@include scrollbar(red, white, 10)` |

Existen más `mixins` que facilitan el uso de los `media queries`, estos son:

```scss
@mixin media-min-width($width)...
```
> Ideal para construir css a partir de `first mobile`. Recibe como parámetro un valor en píxeles.
<br>
 
```scss
@mixin media-max-width($width)...
```
> Ideal para construir css a partir de `first desktop`. Recibe como parámetro un valor en píxeles.
<br>

```scss
@mixin media-min-height($height)...
```
> Poco usual pero se recomienda usar cuando el css depende de la altura del disposito, de menor a mayor.
<br>

```scss
@mixin media-max-height($height)...
```
> Poco usual pero se recomienda usar cuando el css depende de la altura del disposito, de mayor a menor.
<br>

Ejemplo:
```scss
@include media-min-width(1800px); // @media (min-width: 1800px)...
```
<br>

Además de los `mixins` ya mencionados también existen otros que funcionan a partir de breakpoints estándar:
```scss
$breaks: (
  xs: 0px,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
);
```
<br>

> Son dos `mixins`, uno para `first mobile` y otro para `first desktop`:
```scss
@mixin media-break-up($break)... // first mobile
```
```scss
@mixin media-break-down($break)... // first desktop
```

Ejemplos:
```scss
@include media-break-up(md); // @media (min-width: 768px)
```
```scss
@include media-break-down(md); // @media (max-width: 767px)
```

**[⬆ Volver al índice](#-índice)**

<br>

## 💥 ECMAScript
Los navegadores actuales no soportan las nuevas características de Javascript y estas facilitan la construcción de aplicaciones web, para ello se plantea utilizar `Esbuild` como empaquetador de aplicaciones pero `Codermk` solo usa la opción de generar código de javascript compatible para la mayoría de navegadores.

### ¿Qué es Esbuild?
[ESBuild](https://esbuild.github.io/) es el empaquetador más recientemente popular de JavaScript. Su principal característica y ventaja frente al resto de empaquetadores es su velocidad de compilación.

### Estructura de archivos JS

```
src
└── js
|   ├── _entries
|   ├── components
|   └── stores
```

- `_entries`: es la carpeta principal, cada archivo `js` ubicado aquí será compilado.
- `components`: en esta carpeta se ubicarán los componentes que la maqueta necesitará, la forma en la que se construya cada componente es de libre elección según la funcionalidad de dicho componente.
- `stores`: si es necesario utilizar variables globales que guarden información de la aplicación se recomienda crear `stores` los cuales leen o modifican las variables, por defecto se crea el store `mkStore`.

Si es necesario se pueden crear más carpetas según el enfoque de la maqueta.

### Constantes JS
`Esbuild` tiene acceso a las datos de las colecciones JSON y también obtiene el estado de la maqueta, si está en desarrollo o es la versión compilada.  

Estas constantes son:
- `__mkdata`: Al igual que desde el motor de plantillas, `Esbuild` tiene un objeto de todas las colecciones.
- `__mode`: Es un string que tendrá dos valores, `production` ó `development`.

**[⬆ Volver al índice](#-índice)**

<br>

## 🥳 Font icons
Usar iconos SVG es un reto al momento de maquetar, `Codermk` utiliza el paquete [Fantasticon](https://www.npmjs.com/package/fantasticon) el cual permite generar archivos de fuentes y el css correspondiente a partir de iconos SVG.

### Estructura de iconos
```
src
└── icons
|   └── [00]code-labs.svg
```

Todos los iconos tienen que estar dentro de la carpeta `src/icons` y tienen una nomenclatura especial.

- Deben tener un `ID` incremental, este empieza en `00`, por ende el siguiente será `01`, esto hasta un máximo de `99`, el `ID` debe estar dentro de dos corchetes `[]` y se escriben al principio del nombre del archivo.
- Seguido del `ID` y sin espacios debe ir el nombre del icono, este debe ser único y jamás repetirse, también debe ser escrito en minúsculas y los espacios se harán con un guión `-`. Por ejemplo, `[01]arrow-right.svg`.

Al agregar un nuevo icono se tiene que ejecutar el siguiente comando:
```sh
npm run icons
```

### ¿Cómo usar iconos SVG?
Si se usa como clase dentro del HTML, la clase tendrá siempre el prefijo `ci--` y en seguida escribir el nombre del icono; se recomienda usar la etiqueta `span` para insertar un icono. Por ejemplo:

```html
<span class="ci--code-labs"></span>
<!-- [00]code-labs.svg -->
```

Si se usa como estilo CSS, cada icono solo se puede utilizar en pseudo-elementos, ya sea `::before` o `::after`. Para esto hay un mixin llamado `icon` el cual recibe el ID del icono en formato `number`, es decir, si el `ID` es `[05]`, se envía `5`. Por ejemplo:

```scss
.List-item {
  // ...
  &::before {
    @include icon(0); // [00]code-labs.svg
  }
}
```

**[⬆ Volver al índice](#-índice)**

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
