const fs = require("fs").promises
const templatePath = "./templates/test.maru"
const templateList = "./templates/template-list.maru"

exports.handleGameRoute = async function (pathSegments, request, response) {
   function statusCodeResponse(code, value, type) {
      response.writeHead(code, { 'Content-Type': `${type}` });
      response.write(value);
      response.end();
   }

   function ReplaceTemplate(placeholder, newValue) {
      return template.replaceAll(`%${placeholder}%`, `${newValue}`)
   }
   
   if (pathSegments.length === 0) {
      let template = (await fs.readFile(templateList)).toString()
      let profiles = [
         {
            name: "1",
            url: "/profiles/1"
         },
         {
            name: "2",
            url: "/profiles/2"
         }
      ];
      let lis = ""
      for (let i = 0; i < profiles.length; i++){
         let obj = profiles[i]
         lis += `<li><a href="${obj.url}">${obj.name}</a></li>`
      }

      template = template.replaceAll('%profiles%', lis)

      statusCodeResponse(200, template, "text/html")
      return
   }

   let seg = pathSegments.shift()

   let template = (await fs.readFile(templatePath)).toString()

   switch (seg) {
      case "1":
         template = ReplaceTemplate("name", "1")
         template = ReplaceTemplate("age", "1")
         break
      default:
         statusCodeResponse(404, "404 Not Found", "text/plain")
         return
   }

   statusCodeResponse(200, template, "text/html")
}