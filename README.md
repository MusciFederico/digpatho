# Propuesta de Mejora del Frontend para DigPatho

## Contenido del Archivo ZIP

Este archivo ZIP contiene los siguientes elementos:

1. Carpeta `pruebaTecnica/`: Código fuente del frontend desarrollado
2. Archivo `README.md`: Este documento con instrucciones de implementación
3. Carpeta `capturas/`: Capturas de pantalla de los prototipos
4. Archivo `video_demostracion.mp4`: Video explicativo de la propuesta
5. Archivo `informe_mejoras.pdf`: Informe detallado de las mejoras propuestas

## Instrucciones de Implementación y Ejecución Local

### Requisitos Previos

* Node.js (v14 o superior)
* npm (v6 o superior)

### Pasos para la Implementación

1. Descomprima el archivo ZIP en su directorio de trabajo.
2. Abra una terminal y navegue hasta la carpeta `pruebaTecnica/`:
cd ruta/a/la/carpeta/pruebaTecnica
Instale las dependencias del proyecto:
npm install
Para ejecutar el proyecto en modo de desarrollo:
npm run dev
La aplicación estará disponible en `http://localhost:3000`.
5. Para construir la versión de producción:
npm run build
npm start

## Uso de Docker

### Construcción de la Imagen Docker

Se ha incluido un Dockerfile en el proyecto que permite empaquetar la aplicación en una imagen Docker. Esto facilita la ejecución de la aplicación en cualquier entorno que soporte Docker, sin necesidad de configurar dependencias manualmente.

#### Pasos para Construir la Imagen y ejecutar el Contenedor

1. Asegúrese de tener Docker instalado y en funcionamiento en su máquina.
2. Navegue hasta la carpeta raíz del proyecto `pruebaTecnica/`:
3. Ejecute el siguiente comando para construir la imagen Docker:
npm run docker:build ( asegurese de tener Docker ejecutado )
4. Ejecute el siguiente comando para ejecutar la imagen Docker:
npm run docker:run ( alternativamente puede ejecutar el conteiner Docker desde Docker Desktop )

## Descripción de la Solución Propuesta


### Mejoras Implementadas

1. **Interfaz de Usuario Modernizada**: Se ha rediseñado completamente la interfaz utilizando Tailwind CSS para lograr un aspecto más moderno y profesional.
2. **Navegación Mejorada**: Se implementó un sistema de pestañas para facilitar la navegación entre diferentes tipos de análisis de cáncer.
3. **Optimización de Carga de Imágenes**: Se mejoró el proceso de carga y previsualización de imágenes para una experiencia más fluida (Drag and drop incluido).
4. **Visualización de Resultados**: Se diseñó una nueva forma de presentar los resultados del análisis, más clara y detallada.
5. **Responsive Design**: La aplicación es totalmente responsiva, adaptándose a diferentes tamaños de pantalla.
6. **Soporte Multilingüe**: Se implementó la capacidad de cambiar entre inglés y español, permitiendo a los usuarios utilizar la aplicación en su idioma preferido y ampliando la accesibilidad para una audiencia internacional.

### Características Adicionales Propuestas

1. **Modo Oscuro**: Se incluyó la opción de cambiar entre modo claro y oscuro para mejorar la comodidad visual.
2. **Exportación de Resultados**: Se añadió la funcionalidad para exportar los resultados en formato PDF.
3. **Tutorial Interactivo**: Se implementó un tutorial paso a paso para nuevos usuarios.

### Implementación Técnica

* **Framework**: Se utilizó Next.js para aprovechar el renderizado del lado del servidor y mejorar el SEO.
* **Gestión de Estado**: Se implementó React Context API para un manejo eficiente del estado global.
* **Tipado**: Se utilizó TypeScript para mejorar la calidad del código y facilitar el mantenimiento.
* **Estilizado**: Se empleó Tailwind CSS para un diseño rápido y consistente.

Para una descripción más detallada de las mejoras y características adicionales, por favor consulte el archivo `informe_mejoras.pdf`.

## Capturas de Pantalla y Video Demostrativo

* Las capturas de pantalla de los prototipos se encuentran en la carpeta `capturas/`.
* El video demostrativo `video_demostracion.mp4` ofrece una explicación detallada de la propuesta en funcionamiento.

Agradezco la oportunidad de presentar esta propuesta y estoy disponible para discutir cualquier aspecto del proyecto en detalle.