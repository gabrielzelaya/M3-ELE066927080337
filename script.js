document.addEventListener('DOMContentLoaded', function() {
    const conversations = {
        "Sarah Thompson": [
            { type: 'received', text: '¿Cómo soluciono el error 404?', time: '10:00' },
            { type: 'sent', text: 'Verifica que la URL sea correcta.', time: '10:05' },
            { type: 'received', text: 'Sí, está correcta. ¿Qué más puede ser?', time: '10:10' },
            { type: 'sent', text: 'Revisa los permisos del archivo.', time: '10:15' },
            { type: 'received', text: 'Los permisos están correctos. ¿Alguna otra idea?', time: '10:20' },
            { type: 'sent', text: '¿El archivo realmente existe en el servidor?', time: '10:25' },
            { type: 'received', text: 'Sí, he comprobado que existe.', time: '10:30' },
            { type: 'sent', text: 'Podría ser un problema de configuración del servidor. ¿Has revisado el archivo de configuración?', time: '10:35' },
            { type: 'received', text: 'No, aún no. Lo revisaré. Gracias.', time: '10:40' }
        ],
        "Carlos Rivera": [
            { type: 'received', text: 'Necesito ayuda con la configuración del servidor.', time: 'Ayer' },
            { type: 'sent', text: '¿Qué problema estás experimentando?', time: 'Ayer' },
            { type: 'received', text: 'El servidor no se inicia.', time: 'Ayer' },
            { type: 'sent', text: 'Revisa los logs para ver si hay algún error específico.', time: 'Ayer' },
            { type: 'received', text: 'El log muestra un error de conexión a la base de datos.', time: 'Ayer' },
            { type: 'sent', text: '¿La base de datos está activa y accesible?', time: 'Ayer' },
            { type: 'received', text: 'Sí, puedo acceder a ella desde mi máquina local.', time: 'Ayer' },
            { type: 'sent', text: '¿Estás seguro de que las credenciales en el archivo de configuración del servidor son correctas?', time: 'Ayer' },
            { type: 'received', text: 'Revisaré eso. Gracias.', time: 'Ayer' }
        ],
        "Emily Watson": [
            { type: 'received', text: '¿Cómo optimizar mi base de datos?', time: '10:00' },
            { type: 'sent', text: '¿Qué tipo de base de datos estás usando?', time: '10:05' },
            { type: 'received', text: 'MySQL.', time: '10:10' },
            { type: 'sent', text: 'Asegúrate de tener índices en tus tablas.', time: '10:15' },
            { type: 'received', text: 'Ya tengo índices. ¿Qué más puedo hacer?', time: '10:20' },
            { type: 'sent', text: 'Puedes revisar las consultas para asegurarte de que están optimizadas.', time: '10:25' },
            { type: 'received', text: '¿Alguna herramienta recomendada?', time: '10:30' },
            { type: 'sent', text: 'Puedes usar el analizador de consultas de MySQL.', time: '10:35' },
            { type: 'received', text: 'Gracias, lo revisaré.', time: '10:40' }
        ],
        "Mark Lee": [
            { type: 'received', text: 'Tengo problemas con la autenticación.', time: 'Hoy' },
            { type: 'sent', text: '¿Qué tipo de autenticación estás utilizando?', time: 'Hoy' },
            { type: 'received', text: 'OAuth2.', time: 'Hoy' },
            { type: 'sent', text: 'Verifica que los tokens sean válidos.', time: 'Hoy' },
            { type: 'received', text: 'Los tokens están expiriendo rápidamente.', time: 'Hoy' },
            { type: 'sent', text: 'Asegúrate de que el tiempo de vida del token esté configurado correctamente.', time: 'Hoy' },
            { type: 'received', text: '¿Dónde configuro eso?', time: 'Hoy' },
            { type: 'sent', text: 'Depende del proveedor de OAuth2. Revisa su documentación.', time: 'Hoy' },
            { type: 'received', text: 'Gracias, lo revisaré.', time: 'Hoy' }
        ],
        "Ana García": [
            { type: 'received', text: '¿Puedes revisar mi código?', time: '10:00' },
            { type: 'sent', text: 'Claro, envíamelo.', time: '10:05' },
            { type: 'received', text: 'Aquí está.', time: '10:10' },
            { type: 'sent', text: 'Voy a revisarlo.', time: '10:15' },
            { type: 'received', text: 'Gracias.', time: '10:20' },
            { type: 'sent', text: 'Parece que tienes un error en la línea 25.', time: '10:25' },
            { type: 'received', text: 'Voy a corregirlo. ¿Algo más?', time: '10:30' },
            { type: 'sent', text: 'No, eso debería solucionar el problema.', time: '10:35' },
            { type: 'received', text: 'Perfecto, gracias.', time: '10:40' }
        ]
    };

    document.getElementById('menu-btn').addEventListener('click', function() {
        document.getElementById('menu').classList.toggle('open');
    });

    document.getElementById('toggle-chat-list').addEventListener('click', function() {
        document.getElementById('chat-list').classList.toggle('open');
    });

    document.getElementById('attach-btn').addEventListener('click', function() {
        document.getElementById('file-input').click();
    });

    document.getElementById('file-input').addEventListener('change', function(event) {
        var files = event.target.files;
        if (files.length > 0) {
            // Aquí puedes manejar el archivo, por ejemplo, enviarlo a un servidor
            addMessageToChat('Archivo seleccionado: ' + files[0].name, 'sent');
        }
    });

    document.querySelectorAll('.chat-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            document.querySelectorAll('.chat-item').forEach(function(item) {
                item.classList.remove('selected');
            });
            e.currentTarget.classList.add('selected');
            e.currentTarget.classList.remove('unread');
            var header = document.getElementById('chat-window').querySelector('header');
            header.querySelector('img').src = e.target.closest('.chat-item').querySelector('img').src;
            header.querySelector('span').textContent = e.target.closest('.chat-item').querySelector('.name').textContent;
            var chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML = '';  // Clear previous messages

            var selectedUser = header.querySelector('span').textContent;
            if (conversations[selectedUser]) {
                conversations[selectedUser].forEach(function(msg) {
                    chatMessages.appendChild(createMessage(msg.text, msg.type, msg.time));
                });
            }
        });
    });

    document.getElementById('send-btn').addEventListener('click', function() {
        var messageInput = document.getElementById('message-input');
        var messageText = messageInput.value.trim();
        if (messageText) {
            addMessageToChat(messageText, 'sent');
            messageInput.value = '';
            simulateBotResponse(messageText);
        }
    });
});

function createMessage(text, type, time) {
    var messageContainer = document.createElement('div');
    messageContainer.classList.add('message', type);
    var messageParagraph = document.createElement('p');
    messageParagraph.textContent = text;
    var messageTime = document.createElement('span');
    messageTime.classList.add('timestamp');
    messageTime.textContent = time;
    messageContainer.appendChild(messageParagraph);
    messageContainer.appendChild(messageTime);
    return messageContainer;
}

function addMessageToChat(text, type) {
    var chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(createMessage(text, type, new Date().toLocaleTimeString()));
    chatMessages.scrollTop = chatMessages.scrollHeight;  // Scroll to the bottom
}

function simulateBotResponse(userMessage) {
    setTimeout(function() {
        addMessageToChat('Respuesta automática a: ' + userMessage, 'received');
    }, 1000);
}
