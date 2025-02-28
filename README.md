# Food Parcel - Backend
This is the backend service of Food Parcel app. REST APIs, db integrations and other backend related code will be in this repository  
[Click here to check Frontend Repo](https://github.com/Satyaveerjaligama/food-parcel-frontend)

## This application is developed using
- Node JS
- Express JS
- Mongo DB
- Yup (for validations)

## Users
1. Customer
2. Restaurant
3. Delivery agent

## APIs
I have developed the APIs to store, fetch, update and delete the data. There are lot of API that are developed, describing few of them below.
1. **Registration**  
This post API is going to create a document in one of the collections.

2. **Login**  
This post API is not going to store anything, but it will check whether the details entered by user is valid or not.

3. **Change Password, Update details**  
This is a patch API, it is going to update the existing document with new password/details without creating or deleting the document

4. **All orders**  
This is a common API used for all the 3 users to fetch the orders and display in the My orders page.

5. **Active orders**  
This API is going to fetch all the active/incoming orders of a restaurant

6. **Get Menu items**  
We have to pass the restaurant id to this API, in return it is going to fetch all the menu items of that restaurant

7. **Fetch Restaurants**
If we pass any pincode, based on that pincode API is going to return the list of restaurants in that location

8. **File upload**  
This API is used to upload an image, we have to pass the unique id of customer/restaurant/delivery agent/menu item.
Based on the unique id, we will be uploading the image in the respective document. While fetching the image we are going to get the base 64 of the image and display in the UI.
