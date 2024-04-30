document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display list of patients
    function fetchPatients() {
      fetch('/patient')
        .then(response => response.json())
        .then(data => {
          const patients = data.patients;
          const patientList = document.getElementById('patient-list');
          patientList.innerHTML = '';
  
          patients.forEach(patient => {
            // Create HTML elements to display each patient
            const patientDiv = document.createElement('div');
            patientDiv.innerHTML = `
              <p>${patient.given}</p>
              <button class="edit-btn" data-id="${patient.id}">Edit</button>
              <button class="delete-btn" data-id="${patient.id}">Delete</button>
            `;
            patientList.appendChild(patientDiv);
          });
        })
        .catch(error => console.error('Error fetching patients:', error));
    }
  
    // Function to add a new patient
    function addNewPatient(patientData) {
      fetch('/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add new patient');
        }
        // Refresh patient list after successful addition
        fetchPatients();
      })
      .catch(error => console.error('Error adding new patient:', error));
    }
  
    // Add event listener for form submission
    document.getElementById('new-patient-form').addEventListener('submit', event => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      // Get form data
      const formData = new FormData(event.target);
      const patientData = {
        active: formData.get('active'),
        useType: formData.get('useType'),
        family: formData.get('family'),
        given: formData.get('given')
        // Add more attributes as needed based on your Patient model
      };
  
      // Add new patient
      addNewPatient(patientData);
    });
  
    // Fetch and display patients when the page loads
    fetchPatients();
  });