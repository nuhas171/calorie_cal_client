const checkPassStrength = (password) => {
   if(password === "") return "inherit!important"

   const strongPass = new RegExp(
     "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
   ).test(password)
   const mediumPass = new RegExp(
     "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
   ).test(password)

   if(strongPass) return "#2e7d32!important";
   else if(mediumPass) return "#ffa726!important"
   else return "#f44336!important"
 };

 export default checkPassStrength