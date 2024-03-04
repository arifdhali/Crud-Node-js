const deleteLinks = document.querySelectorAll('.delete-link');
const modal = new bootstrap.Modal(document.getElementById('exampleModal'));

deleteLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const id = this.getAttribute('data-delete');
        const deleteBtn = document.getElementById('deleteBtn');
        deleteBtn.dataset.id = id;
        modal.show();
    });
});

const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', function () {
    const id = this.dataset.id;

    // send request to the server
    fetch(`/delete/${id}`, {
        method: 'get'
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            return response.json();
        })
        .then(result => {
            console.log('User deleted successfully');
            modal.hide();
        })
        .catch(error => {
            console.error('Error deleting user:', error.message);
        });

    console.log('Deleting user with ID:', id);
    modal.hide();
});



