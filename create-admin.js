const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = 'mongodb+srv://c4nd3lm_db_user:d1b4tBT4ihsWTBNl@jezza.87shlgk.mongodb.net/?appName=Jezza';

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model('Admin', AdminSchema);

async function createAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado a MongoDB\n');

        const username = 'admin';
        const password = 'juli2026';

        // Verificar si el usuario ya existe
        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            console.log(`⚠️  El usuario "${username}" ya existe en la base de datos`);
            await mongoose.disconnect();
            process.exit(0);
            return;
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo admin
        const newAdmin = await Admin.create({
            username,
            password: hashedPassword,
        });

        console.log('✅ Usuario admin creado exitosamente!\n');
        console.log(`   Usuario: ${newAdmin.username}`);
        console.log(`   Contraseña: ${password}`);
        console.log(`   Creado: ${newAdmin.createdAt}\n`);

        // Mostrar todos los usuarios
        const allAdmins = await Admin.find({}, 'username createdAt');
        console.log(`📊 Total de usuarios admin: ${allAdmins.length}\n`);
        allAdmins.forEach((admin, index) => {
            console.log(`${index + 1}. Usuario: "${admin.username}"`);
        });

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
}

createAdmin();
