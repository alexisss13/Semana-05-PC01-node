# ToyBox Manager 🧸

✨ Un gestor de inventario de juguetes moderno y completo, desarrollado como una aplicación web full-stack. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de forma intuitiva y eficiente.

![ToyBox Manager Demo](https://i.imgur.com/uGfW7kL.png)
*(Te recomiendo subir una captura de tu proyecto y reemplazar esta URL)*

---

## 🌟 Características Principales

-   **Gestión CRUD completa:** Añade, edita, visualiza y elimina juguetes fácilmente.
-   **Dashboard con Estadísticas:** Métricas clave del inventario actualizadas en tiempo real.
-   **Interfaz Moderna y Responsiva:** Diseño limpio y adaptable a cualquier dispositivo, construido con Bootstrap 5.
-   **Modo Oscuro 🌓:** Tema oscuro persistente que mejora la experiencia visual y cuida tu vista.
-   **Paginación Eficiente:** Navega por grandes listas de juguetes sin sobrecargar la interfaz.
-   **Notificaciones Instantáneas:** Feedback visual (toasts) para cada operación realizada.
-   **Arquitectura Modular:** Lógica de UI (`scripts.js`) y de datos (`index.ejs`) claramente separadas para un mejor mantenimiento.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto utiliza una combinación de tecnologías modernas para el desarrollo backend y frontend:

-   **Backend:**
    -   [**Node.js**](https://nodejs.org/): Entorno de ejecución para JavaScript.
    -   [**Express.js**](https://expressjs.com/): Framework para construir la API REST y servir las vistas.
    -   [**MongoDB**](https://www.mongodb.com/): Base de datos NoSQL para almacenar los datos.
    -   [**Mongoose**](https://mongoosejs.com/): ODM para modelar los objetos de la base de datos.
-   **Frontend:**
    -   [**EJS**](https://ejs.co/): Motor de plantillas para renderizar HTML con datos del servidor.
    -   [**Bootstrap 5**](https://getbootstrap.com/): Framework CSS para un diseño responsivo y profesional.
    -   **JavaScript (Vanilla):** Para la interactividad del cliente (UI, paginación, modo oscuro).
-   **Herramientas de Desarrollo:**
    -   **ESLint** y **Prettier**: Para mantener la calidad y consistencia del código.

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/toybox-manager.git](https://github.com/tu-usuario/toybox-manager.git)
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd toybox-manager
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Crea un archivo `.env`** en la raíz del proyecto y añade tus variables de entorno. Puedes usar el archivo `.env.example` como guía:
    ```env
    # URL de conexión a tu base de datos de MongoDB Atlas o local
    MONGO_URI="mongodb+srv://tu_usuario:tu_contraseña@cluster..."

    # Puerto en el que correrá el servidor
    PORT=3000
    ```

5.  **Inicia el servidor:**
    ```bash
    npm start
    ```

6.  **Abre tu navegador** y visita `http://localhost:3000`.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
