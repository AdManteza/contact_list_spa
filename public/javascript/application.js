$( document ).ready(function() {

  var displayResult = function(contact) {
    var deleteButton = `<td><button onclick="deleteContact(${contact.id})" class="btn btn-danger btn-xs">Delete Contact</button></td>`;
    var row = `<tr id="${contact.id}"><td>${contact.firstname}</td><td>${contact.lastname}</td><td>${contact.email}</td>${deleteButton}</tr>`;
    $('tbody').append(row);
  };

  displayAllContacts = function() {
    $('tbody tr').remove();
    $.ajax({
      method: "GET",
      url: "/contacts"
    }).done(function(response) {
      response.forEach(function(contact) { 
        displayResult(contact); 
      });
    });
  };

  searchContacts = function() {
    $('tbody tr').remove();
    var searchQuery = document.getElementById("searchQuery").value;
    $.ajax({
      method: "GET",
      url: "/contacts/" + searchQuery
    }).done(function(response) {
      response.forEach(function(contact) { displayResult(contact) });
    });
  }

  addContact = function() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;

    $.ajax({
    url: '/contacts/new',
    data: {firstName, lastName, email},
    method: 'POST',
    success: function(response) {
      displayResult(response);
      alert('Contact Created'); },
    error: function(error) {
      alert('Contact not saved');}
    });
  }

  deleteContact = function(contact_id) {
    $.ajax({
    url: "/contacts/" + contact_id,
    method: 'DELETE',
    success: function(response) {
      alert(`${response.firstname} ${response.lastname} has been deleted!`);
      $(`#${contact_id}`).remove();
    },
    error: function(error) {
      alert('Contact not Deleted');}
    });
  }
    
});









