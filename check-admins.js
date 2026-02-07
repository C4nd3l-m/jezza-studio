const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://c4nd3lm_db_user:d1b4tBT4ihsWTBNl@jezza.87shlgk.mongodb.net/?appName=Jezza';

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: Date,
});

const Admin = mongoose.model('Admin', AdminSchema);

async function checkAdmins() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado a MongoDB\n');

        const admins = await Admin.find({}, 'username createdAt');

        console.log(`📊 Total de usuarios admin: ${admins.length}\n`);

        if (admins.length === 0) {
            console.log('⚠️  No hay usuarios admin creados');
        } else {
            console.log('Usuarios encontrados:');
            admins.forEach((admin, index) => {
                console.log(`${index + 1}. Usuario: "${admin.username}"`);
                console.log(`   Creado: ${admin.createdAt || 'Fecha desconocida'}\n`);
            });
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkAdmins();
