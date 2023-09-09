# Tiktok-Hack

## Introduction

Our team has chosen Problem Statement 3: E-COMMMERCE (Social Commerce).

### Problem Statement:

In today's crowded social e-commerce market, TikTok's shop faces the challenge of distinguishing itself from established brands like Shopee. Prospective users often exhibit reluctance to explore new platforms, driven by concerns regarding product reliability and trustworthiness. To effectively address this issue, we propose the introduction of a dynamic group purchase feature on TikTok.

**The Challenge:**
One of the key concerns that prospective users often have when exploring new e-commerce platforms is the trustworthiness of both the platform and the products being offered. They may question the authenticity and reliability of sellers and the quality of items listed. These doubts can act as significant barriers to adoption. Additionally, they may feel isolated during the shopping process, lacking the sense of social interaction they experience in physical stores.

**The Solution:**
Our proposed solution is to introduce a unique group purchase feature on TikTok that not only streamlines the purchasing process but also adds a social dimension to the platform. This feature enables users to view products in the shopping carts of others and facilitates collaborative group purchases. When a minimum purchase quantity is reached through collaboration, participants receive cashback or discounts as an incentive.

**Why It Works:**
- The group purchase feature on TikTok directly tackles this issue by leveraging the power of social validation. When users see that others have the same item in their shopping cart, it serves as an implicit endorsement of the product's quality and trustworthiness. 
- By participating in a group purchase, users spread the risk associated with buying an unfamiliar product. If multiple users are interested in a particular item and decide to make the purchase together, it minimizes the perceived risk of making a poor buying decision. Users can share their experiences, ask questions, and offer recommendations, which collectively contribute to a sense of trustworthiness.

**The Social Element:**
By allowing users to see what items are in other users' carts, TikTok fosters a sense of community and interactivity among shoppers. This social element encourages users to discuss potential group purchases, collectively decide on the items to buy, and share in the benefits of discounts or cashback. This collaborative shopping experience aims to recreate the social dynamics of traditional shopping trips with friends, where decisions are made collectively.

**The Objective:**
Our primary goal is to encourage users to participate in group purchases, thus enhancing user engagement and building trust. This approach sets TikTok's shopping experience apart from competitors by offering a unique blend of social interaction and savings. Ultimately, we aim to transform TikTok's shop into a trusted and socially engaging platform for online shoppers.

## Features

**1. Group Purchase**
- for payment, all users must pay before the group order can proceed -> users don't have to go through the trouble of helping someone pay first and collecting back money later

**2. Invite Friends (Existing and New Users)**
- Existing TikTok Users: Users are empowered to invite their existing TikTok contacts and friends to participate in the group purchase order. This feature leverages users' existing social networks, making it easier for them to collaborate and shop together with people they already know.
- New Users: The feature goes a step further by allowing users to invite new users who may not yet be on the TikTok platform. To achieve this, an invite link is generated, which serves as an open invitation to join the group purchase. Users can forward this link to friends and acquaintances who are not yet TikTok users, effectively expanding the user base.

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
    - Make sure you have Expo Go installed on your laptop to run the app on the simulator.
  
## Deep-dive into the Prototype
1. Finding a buddy to buy the latest Converse kicks with? Fret not! Our newest feature, "Find Friends" helps Tiktok users find other users, saved on their phone as a contact, who have also added the item to their cart. This way, like-minded Converse fans can purchase the new sneakers together and grab all those juicy discounts along the way!

From your Contacts Page:  
<img width="150" alt="Simulator Screenshot - iPhone 14 Pro - 2023-09-08 at 23 22 08" src=https://github.com/kyledilao777/Tiktok-Hack/assets/108947940/9040b68e-cb3b-4767-8a79-1d417ff3ff8d>

To our Prototype:  
<img width="150" alt="Simulator Screenshot - iPhone 14 Pro - 2023-09-08 at 23 20 55" src=https://github.com/kyledilao777/Tiktok-Hack/assets/108947940/c4bd4f83-11dc-431e-8eed-c3fa929b9f73>

Don't forget to drop them a message and create a group purchase for your latest buys, clinching those valuable bulk discount vouchers! 

2. Group Purchase Buy

After finding someone to purchase a product together, you will be directed to the group buy page. Alternatively, you can also start a group buy and invite other users as well. 

You can invite users that are suggested by Tiktok, or share the group buy cart with your friend via the sharing link.

After reaching a certain number of units purchased, you will be rewarded with additional discounts. This will encourage users to share the group purchase with more people.

Additionally, by having a new user in your group purchase, another new user discount will be applied. This incentivises existing users to invite more friends to join the Tiktok/Tiktok Shop platform.

The merchant can also choose to set a minimum order value. Users have to meet this value in order to make a purchase.
