# Peddy - Pet Adoption Platform

**Welcome to Pet Site !!!**

**Navbar
```
Implemented the navbar as per the design.
Ensured it is responsive across Desktop, Tablet, and Mobile devices.
```
**Banner Section
```
Designed the banner section as per Figma design.
Included a "View More" button that, when clicked, scrolls down to the “Adopt Your Best Friend” section.
Ensured the banner is fully responsive.
```
Adopt Your Best Friend Section
```
Left Side:
Displayed 4 dynamic categories below the section title and subtitle, fetched from the provided API.
Added a "Sort By Price" button on the right, with a subtitle on the left, as per the design.
By default, show all available pets, with the active category styled according to Figma.
After clicking on a category, fetch and display pets from that category in a grid layout.
If no pets are available for a category, shows a meaningful message.
Each card displays the following:
Thumbnail/Image
Pet Name
Breed
Birth Date
Gender
Price
Buttons: "Like", "Adopt", and "Details"
If any field is missing from the API response, handled it by displaying a placeholder or meaningful message.
Right Side:
Clicking the "Like" button will add the pet's thumbnail to the right-side grid.
Displayed a 2-column layout for liked pet thumbnails.
```