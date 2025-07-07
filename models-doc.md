# User Model Structure

==========================

### Attributes

| Attribute         | Data Type        | Description                              |
| ----------------- | ---------------- | ---------------------------------------- |
| **\_id**          | `String`         | unique mongo id                          |
| **name**          | `String`         | User's full name                         |
| **password**      | `String`         | User's password (hashed)                 |
| **email**         | `String`         | User's email address                     |
| **profileImg**    | `String`         | URL or file path of user's profile image |
| **walletBalance** | `Number (float)` | User's current wallet balance            |

# Expense Model Structure

==========================

### Attributes

| Attribute    | Data Type         | Description                                               |
| ------------ | ----------------- | --------------------------------------------------------- |
| **\_id**     | `String`          | unique mongo id                                           |
| **title**    | `String`          | Brief description of the expense                          |
| **price**    | `Number (float)`  | Amount spent on the expense                               |
| **category** | `String`          | Category of the expense (e.g. Food, Transportation, etc.) |
| **date**     | `Date (ISO 8601)` | Date and time the expense was incurred                    |
