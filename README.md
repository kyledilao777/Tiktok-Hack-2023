# Tiktok-Hack

## Introduction
Our team has chosen Problem Statement 3: E-COMMMERCE (Social Commerce).

### <ins>Problem Statement</ins>  
In today's crowded social e-commerce market, TikTok's shop faces the challenge of distinguishing itself from established brands like Shopee. Prospective users often exhibit reluctance to explore new platforms, driven by concerns regarding product reliability and trustworthiness. To effectively address this issue, we propose the introduction of a dynamic group purchase feature on TikTok.

**<ins>The Challenge</ins>**  
One of the key concerns that prospective users often have when exploring new e-commerce platforms is the trustworthiness of both the platform and the products being offered. They may question the authenticity and reliability of sellers and the quality of items listed. These doubts can act as significant barriers to adoption. Additionally, they may feel isolated during the shopping process, lacking the sense of social interaction they experience in physical stores.

**<ins>The Solution</ins>**  
Our proposed solution is to introduce a unique group purchase feature on TikTok that not only streamlines the purchasing process but also adds a social dimension to the platform. This feature enables users to view products in the shopping carts of others and facilitates collaborative group purchases. When a minimum purchase quantity is reached through collaboration, participants receive cashback or discounts as an incentive.

**<ins>Why It Works</ins>**  
- The group purchase feature on TikTok directly tackles this issue by leveraging the power of social validation. When users see that others have the same item in their shopping cart, it serves as an implicit endorsement of the product's quality and trustworthiness. 
- By participating in a group purchase, users spread the risk associated with buying an unfamiliar product. If multiple users are interested in a particular item and decide to make the purchase together, it minimizes the perceived risk of making a poor buying decision. Users can share their experiences, ask questions, and offer recommendations, which collectively contribute to a sense of trustworthiness.

**<ins>The Social Element</ins>**  
By allowing users to see what items are in other users' carts, TikTok fosters a sense of community and interactivity among shoppers. This social element encourages users to discuss potential group purchases, collectively decide on the items to buy, and share in the benefits of discounts or cashback. This collaborative shopping experience aims to recreate the social dynamics of traditional shopping trips with friends, where decisions are made collectively.

**<ins>The Objective</ins>**  
Our primary goal is to encourage users to participate in group purchases, thus enhancing user engagement and building trust. This approach sets TikTok's shopping experience apart from competitors by offering a unique blend of social interaction and savings. Ultimately, we aim to transform TikTok's shop into a trusted and socially engaging platform for online shoppers.

## Features
**<ins>1.  Group Purchase</ins>**  
Group Purchase allows users to buy items on TikTok Shop in bulk, benefitting them with more discounts and vouchers. Users are empowered to invite their existing TikTok contacts and friends to participate in the group purchase order, making it easier for them to collaborate and shop together with people they already know.

After finding someone to purchase a product together, they will be directed to the group buy page. Alternatively, users can also start a group buy and invite other users as well.  You can invite users that are suggested by Tiktok, or share the group buy cart with your friend via the sharing link. After reaching a certain number of units purchased, you will be rewarded with additional discounts. This will encourage users to share the group purchase with more people.

Additionally, if a new user is added into the group purchase, a new user discount can be applied. This encourages existing users to invite more friends to join the Tiktok/Tiktok Shop platform. The merchant can also choose to set a minimum order value. Users have to meet this value in order to make a purchase.

Extension:
- A unique link can be generated for each group order so that it can be easily shared with new users without the app. They will be able to view the cart, product and prices. Similar to how unregisted users can watch tiktok on web browser.
- Other form of discounts can also be used to gamify the experience. For instance, there can be a counter for the number of new user invite. The amount of discount given will scale with the number of new users invited.


**<ins>2.  Find Friends (Existing and New Users)</ins>**  
Find a friend to purchase those latest Converse kicks with. Our newest feature, "Find Friends", helps Tiktok users find other users, saved on their device as a contact, who have also  added the item to their cart. Now, like-minded Converse fans can purchase the new sneakers together and grab all those crazy discounts along the way. 

As a social feature, Find Friends adds a social element to online shopping by encouragubg users to connect with friends reconnect with old friends as they talk to one another and discuss how they can make a purchase together. 

Limitations:  
- Ideally, users should be lead to group purchase page after they are connected through an in-page button. 
- Currently, our Prototype only allows users to view contacts who have the same item in their cart. There is a need for manual communication with one another to start a Group Purchase. 

## Running the Prototype
To run the Prototype, follow these instructions:

1. **Clone the GitHub Repository:**
   Clone the GitHub repository into your laptop's terminal/command prompt using the following link: [https://github.com/kyledilao777/Tiktok-Hack](https://github.com/kyledilao777/Tiktok-Hack)

2. **Install Dependencies:**
   Download all the dependencies using `npm install`.

3. **Request Supabase API Key and URL:**
   Please send a request to kyledaniel.lao@gmail.com for the private Supabase API key and URL. These credentials are required for the app to function properly.

4. **Create a `.env` File:**
   Add a new `.env` file to the project root directory to contain the Supabase URL and API key.

5. **Start the Prototype:**
   Type the following command into your terminal:

   ```shell
   npx expo start --clear

6. **Run on IOS Simulator**
    - After starting the app, you can run it on an iOS simulator by pressing the i key.
    - Make sure you have Expo Go installed on your laptop to run the app on an **iPhone 14 Pro Max** simulator.
