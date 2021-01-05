# Covid-19-App

Api used - [disease.sh](https://disease.sh/)

### What this app shows
+ Show data worldwide 
+ Show data Country wise
+ Show data on Daily bases and overrall

### Modules used 
+ Bootstrap 5 (via cdn) --> Bootstrap used in this project is in **alpha** phase so can be changed in future 
  + *Css* in head 
      <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
      crossorigin="anonymous"
     />
  + *Script* in Body tag 
      <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
      crossorigin="anonymous"
      ></script>
+ AOS (javascript animation on scroll module)
  + *CSS* in Head tag 
     <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
  + *Script* in Body tag   
     <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
     <script>
       AOS.init();
     </script>
+ React Router Dom
  + npm i react-router-dom
