const USUARIO_POR_DEFECTO = {
    email: 'prueba@prueba.com',
    password: 'password123',
    name: 'Usuario Prueba',
    balance: 50000
};

function inicializarBilletera() {
    localStorage.setItem('billetera_usuario', JSON.stringify(USUARIO_POR_DEFECTO));

    if (!localStorage.getItem('billetera_saldo')) {
        localStorage.setItem('billetera_saldo', USUARIO_POR_DEFECTO.balance);
    }

    if (!localStorage.getItem('billetera_movimientos')) {
        const fechaAyer = new Date(Date.now() - 86400000).toLocaleDateString('es-CL', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        localStorage.setItem('billetera_movimientos', JSON.stringify([
            { id: 1, type: 'Ingreso', amount: 50000, detail: 'Depósito inicial', date: fechaAyer }
        ]));
    }

    if (!localStorage.getItem('billetera_contactos')) {
        localStorage.setItem('billetera_contactos', JSON.stringify([
            { name: "Juan Pérez", cbu: "0123456789012345678901", alias: "juan.p", bank: "Banco Estado" },
            { name: "Yani Flores", cbu: "1098765432109876543210", alias: "yani.f", bank: "Banco Santander" }
        ]));
    }
}

function obtenerSaldo() {
    return parseFloat(localStorage.getItem('billetera_saldo')) || 0;
}

function actualizarSaldo(nuevoSaldo) {
    localStorage.setItem('billetera_saldo', nuevoSaldo);
}

function agregarMovimiento(tipo, monto, detalle) {
    const movimientos = JSON.parse(localStorage.getItem('billetera_movimientos') || '[]');
    const fechaActual = new Date().toLocaleDateString('es-CL', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    movimientos.unshift({
        id: Date.now(),
        type: tipo,
        amount: monto,
        detail: detalle,
        date: fechaActual
    });

    if (movimientos.length > 50) movimientos.pop();
    localStorage.setItem('billetera_movimientos', JSON.stringify(movimientos));
}

function obtenerMovimientos() {
    return JSON.parse(localStorage.getItem('billetera_movimientos') || '[]');
}

function obtenerContactos() {
    return JSON.parse(localStorage.getItem('billetera_contactos') || '[]');
}

function agregarContacto(nuevoContacto) {
    const contactos = obtenerContactos();
    contactos.push(nuevoContacto);
    localStorage.setItem('billetera_contactos', JSON.stringify(contactos));
}

inicializarBilletera();
