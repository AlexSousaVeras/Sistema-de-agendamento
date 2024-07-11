const form = document.getElementById('bookingForm');
const messageDiv = document.getElementById('message');
const userAppointmentsList = document.getElementById('userAppointmentsList');
const appointmentsList = document.getElementById('appointmentsList');
const adminButton = document.getElementById('adminButton');

const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

const renderBookings = () => {
    if (userAppointmentsList) {
        userAppointmentsList.innerHTML = '';
        bookings.forEach(booking => {
            const li = document.createElement('li');
            li.innerHTML = `Nome: ${booking.name}, Data: ${booking.date}, Hora: ${booking.time}`;
            userAppointmentsList.appendChild(li);
        });
    }

    if (appointmentsList) {
        appointmentsList.innerHTML = '';
        bookings.forEach((booking, index) => {
            const li = document.createElement('li');
            li.innerHTML = `Nome: ${booking.name}, Data: ${booking.date}, Hora: ${booking.time} <button onclick="promptDeleteBooking(${index})">Deletar</button>`;
            appointmentsList.appendChild(li);
        });
    }
};

const promptDeleteBooking = (index) => {
    const password = prompt('Digite a senha para deletar o agendamento:');
    if (password === 'Alex') {
        deleteBooking(index);
    } else {
        alert('Senha incorreta!');
    }
};

const deleteBooking = (index) => {
    bookings.splice(index, 1);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    renderBookings();
    messageDiv.textContent = 'Agendamento deletado com sucesso!';
};

adminButton?.addEventListener('click', () => {
    const password = prompt('Digite a senha para acessar a página de administração:');
    if (password === 'Alex') {
        window.location.href = 'admin/admin.html';
    } else {
        alert('Senha incorreta!');
    }
});

form?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const booking = bookings.find(b => b.date === date && b.time === time);

    if (booking) {
        messageDiv.textContent = 'Horário já agendado por outra pessoa. Por favor, escolha outro horário.';
    } else {
        const newBooking = { name, date, time };
        bookings.push(newBooking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        messageDiv.textContent = 'Agendamento realizado com sucesso!';
        form.reset();
        renderBookings();
    }
});

renderBookings();
