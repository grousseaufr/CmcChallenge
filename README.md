# CMC challenge

## Architecture

I used the "ASP.net core with Angular" project model in Visual Studio to generate the application.
<br>
<br>
I used a clean architecture, composed of the 4 different projects.
For the sake of simplicity, the controllers are using directly repositories/entities defined in the Application Core (I could have wrapped the reposistories into services, and used some DTO's in between). I don't think it was useful here.
<br>
<br>
I persisted the cart and selected country in the localstorage, so that we can retrieve them even if we close the browser. If no persistance was needed, I could have used sessionStorage.

### CmcChallenge.Web

This is the .net core web application.
The angular application is in the ClientApp folder.

### CmcChallenge.Core

This project holds the business models (entities) and all the interface definitions used by the repositories and service.

### CmcChallenge.Infrastructure

This one holds the data access layer.
There we can find the DbContext definition and also the differents repositories.<br>
I decided to use the inMemory database provided by EF to hold the data I needed.
I know I could have used some static lists, but I thought it was nice to include some real repositories.

### CmcChallenge.Application

Holds the application services.
The order service obviously would need to persist the order, but I think it was needed here.

---

## Run the application

Just launch the application from Visual Studio. It will launch the angular application in a browser.

---

## Testing

I included some angular unit testing :

- nav-menu.component.spec
- product-item.component.spec
- product-list.component.spec

For the back-end, I included some unit testing for the controllers and shippingService

---
