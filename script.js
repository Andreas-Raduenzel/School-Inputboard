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
        var passwordInput = document.createElement("input");
        passwordInput.type = "password";
        var modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "#333";
        modal.style.color = "#fff";
        modal.style.padding = "20px";
        modal.style.border = "2px solid #ccc";
        modal.style.borderRadius = "8px";
        modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        modal.style.display = "flex";
        modal.style.flexDirection = "column";
        modal.style.alignItems = "center";

        var form = document.createElement("form");
        form.onsubmit = function(event) {
            event.preventDefault();
            var enteredPassword = passwordInput.value;
            if (enteredPassword === "lehrer") {
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
                modal.remove();
            } else {
                alert("Falsches Passwort!");
            }
        };

        var label = document.createElement("label");
        label.textContent = "Bitte Passwort eingeben:";
        label.style.color = "#fff";
        form.appendChild(label);
        form.appendChild(passwordInput);

        var sendButton = document.createElement("button");
        sendButton.textContent = "Senden";
        form.appendChild(sendButton);

        var cancelButton = document.createElement("button");
        cancelButton.textContent = "Abbrechen";
        cancelButton.type = "button";
        cancelButton.onclick = function() {
            modal.remove();
        };
        form.appendChild(cancelButton);

        modal.appendChild(form);
        document.body.appendChild(modal);
    }
}

  // Funktion, die aufgerufen wird, wenn sich die Auswahl in einem Dropdown-Menü ändert
  function changeBackgroundColor(selectElement) {
    // Hintergrundfarbe entsprechend dem ausgewählten Wert festlegen
    var selectedColor = selectElement.value;
    selectElement.style.backgroundColor = selectedColor;

    // Überprüfen, ob das selectElement eines der spezifischen IDs hat
    for (var i = 1; i <= 32; i++) {
        if (selectElement.id === 'colorSelector' + (i * 3 - 2)) {
            // Hintergrundfarbe des zugehörigen Textareas ändern
            var textarea = document.getElementById('myTextarea' + i);
            if (textarea) {
                textarea.style.backgroundColor = selectedColor;
            }
            break; // Stoppen der Schleife, da das entsprechende Textarea gefunden wurde
        }
    }

    // Speichern der Farbe
    saveColorSelections();
}

    // Funktion zum Speichern der Farbwerte der Dropdown-Menüs
    function saveColorSelections() {
        var colorSelectors = document.querySelectorAll('.colorSelector');
        var colors = {};
        colorSelectors.forEach(function(selector) {
            colors[selector.id] = selector.value;
        });

        // AJAX-Anfrage zum Speichern der Farbwerte auf dem Server
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'save_colors.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('Colors saved successfully.');
            } else {
                console.error('Failed to save colors.');
            }
        };
        xhr.send(JSON.stringify(colors));
    }
    

    // Call saveColorSelections() whenever a color selection changes
    document.querySelectorAll('.colorSelector').forEach(function(selector) {
        selector.addEventListener('change', changeBackgroundColor);
    });

    // Beim Laden der Seite gespeicherte Farbwerte anwenden
    window.addEventListener('load', function() {
        // AJAX-Anfrage zum Laden der gespeicherten Farbwerte aus der Textdatei
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'saved_colors.txt');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var savedColors = JSON.parse(xhr.responseText);
                applySavedColors(savedColors); // Funktion aufrufen, um die Farbwerte anzuwenden
            }
        };
        xhr.send();
    });

            // Funktion zum Anwenden der gespeicherten Farbwerte auf die Dropdown-Menüs
        function applySavedColors(savedColors) {
            if (savedColors) {
                Object.keys(savedColors).forEach(function(id) {
                    var dropdown = document.getElementById(id);
                    if (dropdown) {
                        dropdown.value = savedColors[id];
                        dropdown.style.backgroundColor = savedColors[id];
                        
                        // Hintergrundfarbe der zugehörigen Textarea aktualisieren
                        for (var i = 1; i <= 32; i++) {
                            var colorSelectorId = 'colorSelector' + (i * 3 - 2);
                            var textareaId = 'myTextarea' + i;  
                            
                            if (id === colorSelectorId) {
                                var textarea = document.getElementById(textareaId);
                                if (textarea) {
                                    textarea.style.backgroundColor = savedColors[id];
                                }
                                break; // Stoppen der Schleife, da das entsprechende Textarea gefunden wurde
                            }
                        }
                    }
                });
            }
        }
///////////////////////////
// Uhrzeit für Uhr Header//
///////////////////////////
function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var day = now.toLocaleString('default', { weekday: 'long' });
    var date = now.getDate();
    var month = now.toLocaleString('default', { month: 'long' });
    var year = now.getFullYear();
  
    // Add leading zeros if needed
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
  
    var timeString = hours + ':' + minutes + ':' + seconds;
    var dateString = day + ', ' + date + '.' + month + ' ' + year;
  
    document.getElementById('hour').textContent = hours;
    document.getElementById('minute').textContent = minutes;
    document.getElementById('second').textContent = seconds;
    document.getElementById('date').textContent = dateString;
}

// Update time every second
setInterval(updateTime, 1000);

// Initial call to display time immediately
updateTime();

////////////////////////////
// Uhrzeit für rote Linie///
////////////////////////////



  
          