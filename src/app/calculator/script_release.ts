// fetch('data.json').then(response => {
//   return response.json();
// }).then(json => {
//   for (let signe of json.signes) {
//     document.getElementById('grandeur').innerHTML += '<option value="'+ signe[0] +'">'+ signe[0] +' ('+ signe[1] +')</option>';
//     document.getElementById("data_container").innerHTML += '<label for="check_'+ signe[0] +'">'+ signe[0] +' ('+ signe[1] +') :</label> <input id="check_'+ signe[0] +'" type="checkbox" onchange="gray_input(this);"/><input id="area_'+ signe[0] +'" type="number" disabled="true"/></br>';
//   };
//   document.getElementById('check_'+json.signes[0][0]).disabled = true;
// });


// /**
//  * Change l'état de l'entré située à coté de la checkbox
//  * @param {HTMLElement} checkbox - La checkbox en question
//  */
// function gray_input(checkbox) {
//   checkbox.nextElementSibling.disabled = checkbox.checked ? false : true;
//   checkbox.nextElementSibling.value = null;
// };

// /**
//  * Ajoute EventListener et conserve l'ancienne valeur voulue pour la dégriser
//  * @param {String} old_grandeur - Valeur du menu au moment du focus
//  */
// function gray_grandeur(old_grandeur) {
//   let select = document.getElementById('grandeur');
//   select.blur();
//   select.addEventListener('change', change_listener, false);
//   select.parameter = old_grandeur;
// };

// /**
//  * EventListener pour le menu déroulant, grise la valeur voulue
//  */
// function change_listener(evt){
//   document.getElementById('check_'+evt.currentTarget.parameter).disabled = false;
//   let checkbox_gray = document.getElementById('check_'+document.getElementById('grandeur').value);
//   checkbox_gray.disabled = true;
//   checkbox_gray.checked = false;
//   checkbox_gray.nextElementSibling.disabled = true;
//   checkbox_gray.nextElementSibling.value = null;
//   document.getElementById('grandeur').removeEventListener('change', change_listener);
// }


// function formule_reader(json_formules){
//   for (formule of json_formules) {
//     formule = formule.split('=')
//     let missing = [false,""];
//     for (char of formule[1].split('')) {
//       if (char.toLowerCase() != char.toUpperCase() && !missing[0] && window.si.map(x => x[0]).includes(char)) {
//         missing = [typeof window[char] === 'undefined',char];
//       };
//     };
//     if (!missing[0] && document.getElementById('grandeur').value == formule[0]) {
//       return window.usable_formules.push(formule);
//     } else if (!missing[0] && window.usable_formules.length == 0 && typeof window[formule[0]] === "undefined") {
//       window[formule[0]] = eval(formule[1]);
//       window.preformule.push('"'+formule.join('=')+'" soit : '+eval(formule[1]))
//       formule_reader(json_formules);
//     };
//   };
// };

// /**
//  * Lance le calcul de la valeur voulue
//  */
// function calculate() {
//   fetch('data.json').then(response => {
//     return response.json();
//   }).then(json => {
//     /* Création de variable pour chaque grandeur */
//     window.si = json.signes;
//     for (signe of window.si) {
//       if (document.getElementById('area_'+signe[0]).value != "") {
//         window[signe[0]] = document.getElementById('area_'+signe[0]).value;
//       } else {
//         window[signe[0]] = undefined;
//       }
//     };
//     /* Teste chaque formule pour voir si elle est utilisable en fonction des données présentes */
//     window.usable_formules = [];
//     window.preformule = [];
//     formule_reader(json.formules);
//     /* Execute toutes les formules valides */
//     try {
//       for (formule of window.usable_formules) {
//         document.getElementById("results_container").innerHTML = '<h2>'+formule[0]+' = '+eval(formule[1])+' (en utilisant '+ window.preformule.join(' => ') +' => "'+ formule.join("=") +'")</h2>'
//       }
//     } catch(e) {
//       console.log(e)
//     };
//   });
// };