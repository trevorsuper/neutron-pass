function promptMasterPassword(callback) {
    const masterPassword = prompt('Enter your master password:');
    if (masterPassword) {
      callback(masterPassword);
    } else {
      alert('Master password is required.');
    }
  }
  
  function addEntry() {
    promptMasterPassword(masterPassword => {
      const site = prompt('Enter site name:');
      const email = prompt('Enter email:');
      const password = prompt('Enter password:');
  
      if (site && email && password) {
        fetch('http://localhost:3000/passwords', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ masterPassword, site, email, password })
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert('Failed to add entry: ' + data.error);
          } else {
            alert('Entry added successfully');
            revealPasswords();
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    });
  }
  
  function editEntry() {
    promptMasterPassword(masterPassword => {
      const site = prompt('Enter site name to edit:');
      const email = prompt('Enter new email:');
      const password = prompt('Enter new password:');
  
      if (site && email && password) {
        fetch('http://localhost:3000/passwords', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ masterPassword, site, email, password })
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert('Failed to update entry: ' + data.error);
          } else {
            alert('Entry updated successfully');
            revealPasswords();
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    });
  }
  
  function deleteEntry() {
    promptMasterPassword(masterPassword => {
      const site = prompt('Enter site name to delete:');
  
      if (site) {
        fetch('http://localhost:3000/passwords', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ masterPassword, site })
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert('Failed to delete entry: ' + data.error);
          } else {
            alert('Entry deleted successfully');
            revealPasswords();
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    });
  }
  
  function revealPasswords() {
    promptMasterPassword(masterPassword => {
      fetch('http://localhost:3000/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ masterPassword })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert('Failed to reveal passwords: ' + data.error);
        } else {
          const passwordsDiv = document.getElementById('passwords');
          passwordsDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  }