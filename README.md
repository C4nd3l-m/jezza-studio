# Jezza Nails Studio - Panel de Administración

## 🎉 Nuevas Funcionalidades

### Panel de Administración Completo
La administradora ahora puede gestionar todo el contenido de la web sin necesidad de editar código:

- ✅ **Servicios**: Agregar, editar y eliminar servicios con nombre, duración y precio
- ✅ **Promociones**: Crear promociones con título, descripción e imagen
- ✅ **Galería**: Subir y eliminar imágenes de la galería
- ✅ **Autenticación Segura**: Login protegido con contraseña hasheada

### Acceso Secreto 🔐
El acceso al panel de administración está completamente oculto:

**Para acceder**: En la página principal, escribe la palabra **"admin"** (sin comillas) usando el teclado.
- Aparecerá un modal de login elegante
- Ingresa las credenciales y accede al panel

### Credenciales por Defecto
- **Usuario**: `admin`
- **Contraseña**: `jezza2024`

> ⚠️ **Importante**: Cambia estas credenciales después del primer uso por seguridad.

## 🚀 Configuración Inicial

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar MongoDB
Asegúrate de tener la variable de entorno `MONGO_URI` configurada en tu archivo `.env`:
```
MONGO_URI=tu_conexion_mongodb
```

### 3. Crear Usuario Administrador
Antes de usar el panel por primera vez, crea el usuario admin:

**Opción A - Usando el navegador:**
1. Inicia el servidor: `npm run dev`
2. Ve a: `http://localhost:3000/api/auth/init`
3. Deberías ver: `{"success":true,"message":"Admin creado exitosamente"}`

**Opción B - Usando curl:**
```bash
curl -X POST http://localhost:3000/api/auth/init
```

### 4. Iniciar la Aplicación
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 Cómo Usar el Panel Admin

### Acceder al Panel
1. Ve a la página principal
2. Escribe "admin" en el teclado (las 5 letras seguidas)
3. Aparecerá un modal de login
4. Ingresa usuario y contraseña
5. Serás redirigida al panel de administración

### Gestionar Servicios
1. En el panel, ve a la pestaña "Servicios"
2. Completa el formulario con:
   - Nombre del servicio (ej: "Manicura completa")
   - Duración (ej: "60 min")
   - Precio (ej: "$15.000")
3. Haz clic en "Agregar"
4. Para editar: haz clic en el ícono de lápiz
5. Para eliminar: haz clic en el ícono de basura

### Gestionar Promociones
1. Ve a la pestaña "Promociones"
2. Completa:
   - Título de la promoción
   - Descripción
   - Sube una imagen haciendo clic en "Subir Imagen"
3. Haz clic en "Agregar"
4. Las promociones aparecerán en la página principal automáticamente

### Gestionar Galería
1. Ve a la pestaña "Galería"
2. Opcionalmente escribe una descripción para la imagen
3. Haz clic en "Seleccionar y Subir Imagen"
4. Elige una imagen de tu computadora
5. La imagen se subirá automáticamente y aparecerá en el carrusel de la página principal

### Cerrar Sesión
Haz clic en el botón "Cerrar Sesión" en la esquina superior derecha del panel.

## 🔒 Seguridad

### Cambiar Contraseña del Admin
Para cambiar la contraseña, necesitarás:

1. Conectarte a tu base de datos MongoDB
2. Buscar el documento del admin en la colección `admins`
3. Generar un nuevo hash de contraseña usando bcrypt
4. Actualizar el campo `password`

**O** puedes crear un endpoint temporal para cambiar la contraseña (recomendado hacerlo en desarrollo).

### Mejores Prácticas
- ✅ Usa contraseñas fuertes
- ✅ No compartas las credenciales
- ✅ Cambia la contraseña por defecto inmediatamente
- ✅ Configura `JWT_SECRET` en las variables de entorno para producción

## 📁 Estructura de Archivos

```
src/
├── app/
│   ├── admin/              # Panel de administración
│   │   ├── layout.tsx      # Layout con protección de ruta
│   │   └── page.tsx        # Dashboard con tabs
│   ├── api/                # Endpoints de la API
│   │   ├── auth/           # Autenticación
│   │   ├── services/       # CRUD servicios
│   │   ├── promotions/     # CRUD promociones
│   │   ├── gallery/        # CRUD galería
│   │   └── upload/         # Subida de imágenes
│   └── page.tsx            # Página principal (con acceso secreto)
├── components/
│   ├── admin/              # Componentes del panel admin
│   │   ├── AdminServices.tsx
│   │   ├── AdminPromotions.tsx
│   │   └── AdminGallery.tsx
│   ├── LoginModal.tsx      # Modal de login
│   └── AdminIndicator.tsx  # Indicador de sesión activa
├── contexts/
│   └── AuthContext.tsx     # Contexto de autenticación
├── lib/
│   ├── auth.ts             # Utilidades de autenticación JWT
│   └── mongo.ts            # Conexión a MongoDB
└── models/                 # Modelos de Mongoose
    ├── Admin.ts
    ├── Service.ts
    ├── Promotion.ts
    └── GalleryItem.ts
```

## 🎨 Características Técnicas

- **Framework**: Next.js 16 con App Router
- **Autenticación**: JWT con cookies httpOnly
- **Base de Datos**: MongoDB con Mongoose
- **Seguridad**: Contraseñas hasheadas con bcrypt
- **UI**: Tailwind CSS + Framer Motion
- **Subida de Imágenes**: Sistema de archivos local (public/uploads)

## 🐛 Solución de Problemas

### "Cannot find module '@/contexts/AuthContext'"
Esto es solo un error de TypeScript temporal. Reinicia el servidor de desarrollo:
```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

### Las imágenes no se muestran
1. Verifica que la carpeta `public/uploads` exista
2. Asegúrate de que el servidor tiene permisos de escritura
3. Revisa la consola del navegador para errores

### No puedo acceder al panel admin
1. Verifica que creaste el usuario admin (paso 3 de configuración)
2. Asegúrate de escribir exactamente "admin" (minúsculas)
3. Revisa que las credenciales sean correctas

## 📝 Notas Adicionales

- Las imágenes se guardan en `public/uploads/`
- Para producción, considera usar un servicio como Cloudinary o AWS S3
- El acceso secreto funciona escribiendo "admin" en cualquier momento en la página principal
- Cuando estás logueada, verás un pequeño badge "Admin" en la esquina inferior derecha

## 🎯 Próximos Pasos Recomendados

1. Cambiar las credenciales por defecto
2. Configurar `JWT_SECRET` en variables de entorno
3. Agregar las primeras imágenes a la galería
4. Crear los servicios y promociones iniciales
5. Para producción: configurar almacenamiento de imágenes en la nube

---

¡Disfruta de tu nuevo panel de administración! 🎉
