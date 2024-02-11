document.addEventListener('DOMContentLoaded', function () {
    // Die Funktion wird beim Laden der Seite ausgeführt

    // Funktion zum Laden des gespeicherten Textes und Anzeigen in den Textfeldern
    function loadSavedText() {
        // Wochentage, für die Text gespeichert werden soll
        const days = ['montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag'];

        // Durchlaufe die Tage und lade den gespeicherten Text vom Server
        days.forEach(function (day) {
            for (let i = 1; i <= 8; i++) {
                const textKey = day + '_text_' + i; // Eindeutiger Name für jedes Textfeld
                // Lade den Text vom Server
                fetch('load_text.php?day=' + day + '&index=' + i)
                    .then(response => response.text())
                    .then(savedText => {
                        // Wenn gespeicherter Text vorhanden ist, setze ihn in das entsprechende Textfeld ein
                        if (savedText.trim() !== "") {
                            document.getElementsByName(textKey)[0].value = savedText;
                        }
                    })
                    .catch(error => console.error('Fehler beim Laden des Textes:', error));
            }
        });
    }
    



    // Beim Laden der Seite gespeicherten Text laden
    loadSavedText();

    // Funktion zum Speichern des Textes
    function saveText(textarea) {
        var userInput = textarea.value;
        var day = textarea.name.split("_")[0]; // Extrahieren Sie den Wochentag aus dem Namen des Textfelds
        var index = textarea.name.split("_")[2]; // Extrahieren Sie den Index aus dem Namen des Textfelds
        var textKey = day + '_text_' + index; // Eindeutiger Name für jedes Textfeld

        // Speichern Sie den Text auf dem Server
        fetch('save_text.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'day=' + day + '&index=' + index + '&text=' + encodeURIComponent(userInput),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Text erfolgreich gespeichert:', data);
        })
        .catch((error) => {
            console.error('Fehler beim Speichern des Textes:', error);
        });
    }

    // Fügen Sie den Event Listener zu allen Textfeldern hinzu
    document.querySelectorAll('textarea').forEach(function (textarea) {
        textarea.addEventListener('input', function () {
            saveText(this);
        });
    });
    
   

    
});

///////////////////////Passwort_Abfrage////////////////////////////////////////////////////////
/*
// Verbindung zu WebSocket-Server herstellen
const socket = new WebSocket('wss://crumbtech.de/obs/');

// Event-Handler für eingehende WebSocket-Nachrichten
socket.addEventListener('message', function (event) {
   const data = JSON.parse(event.data);
   const textarea = document.querySelector(`textarea[name='${data.textKey}']`);
   if (textarea) {
       textarea.value = data.text;
   }
});*/

var passwordEntered = false;

function checkPassword() {
if (!passwordEntered) {
   var password = prompt("Bitte geben Sie das Passwort ein:");
   if (password === null) {
       // Benutzer hat auf "Abbrechen" geklickt
       return;
   } else if (password === "lehrer") {
       // Passwort korrekt, alle Elemente entsperren
       var disabledElements = document.querySelectorAll("[disabled]");
       disabledElements.forEach(function(element) {
           element.removeAttribute("disabled");
       });
       var readonlyTextareas = document.querySelectorAll("textarea[readonly]");
       readonlyTextareas.forEach(function(textarea) {
           textarea.removeAttribute("readonly");
       });
       passwordEntered = true;
   } else {
       alert("Falsches Passwort!");  
   }
}
}
/*
// Event-Handler für Änderungen in den Textareas
document.querySelectorAll('textarea').forEach(function (textarea) {
   textarea.addEventListener('input', function () {
       const textKey = this.name;
       const text = this.value;
       const message = { textKey, text };
       socket.send(JSON.stringify(message));
   });
});///Ende-Passwort-Abrafge*/

