# HeroMetrics App Info

## Screens MVP

### 1\. Welcome Screen

-   Purpose: Give a brief introduction to the app and its key value proposition.
-   Key Elements: A concise overview of what the app does and a "Get Started" button to lead users to either the registration or login screen.

### 2\. Registration/Login Screen

-   Purpose: Enable new users to create an account and existing users to log in.
-   Key Elements: Form fields for email and password, sign-up and login buttons, and a link to switch between logging in and signing up.

### 3\. Dashboard/Home Screen

-   Purpose: Provide a central hub where users can see a summary of their current levels in various metrics and navigate to detailed views.
-   Key Elements: Summary stats of the user's metrics (like strength, intelligence, agility), a button or link to update these metrics, and a visual representation of overall progress (could be a simple progress bar or a numeric level indication).

### 4\. Metric Input/Update Screen

-   Purpose: Allow users to input or update their measurements for different metrics.
-   Key Elements: Input fields for each metric the app tracks, instructions or tips on how to measure or estimate each metric accurately, and a submit button to save changes.

### 5\. Progress Visualization Screen

-   Purpose: Show detailed visual representations of the user's progress over time in each metric.
-   Key Elements: Charts or graphs (like area charts) for each metric showing historical data, with the ability to view progress over different time frames (week, month, year).

The HeroMetrics app utilizes a combination of Tab, Drawer, and Stack Navigators to provide a seamless and intuitive navigation experience. This document outlines how these navigators are connected and function within the app.

## Navigation Overview

- **Tab Navigator**: Serves as the primary method for navigating between the main areas of the app, such as the Dashboard, Progress Visualization, and other core features.
- **Drawer Navigator**: Offers additional navigation options and settings, accessible from any part of the app, providing a convenient way to access less frequently used features or settings.
- **Stack Navigator**: Manages the hierarchical navigation within each section, allowing users to drill down into more detailed screens from the tabs or drawer menu and navigate back with ease.

## Structure and Flow

### Tab Navigator

The Tab Navigator is the heart of the app's navigation, positioned at the bottom of the screen for easy access. It includes the following tabs:

1. **Dashboard**: The home screen showing a summary of the user's metrics and progress.
2. **Progress**: A detailed view of the user's progress over time in various metrics.
3. **More**: A tab that opens the Drawer Navigator for additional options and settings.

### Drawer Navigator

The Drawer Navigator is accessible from the "More" tab in the Tab Navigator or by swiping from the edge of the screen. It includes:

1. **Profile**: Manage user profile information and preferences.
2. **Settings**: App settings, such as notification preferences and theme.
3. **Help & Support**: Access to FAQs, support resources, and contact information.

### Stack Navigator

Each main area within the Tab and Drawer Navigators (e.g., Dashboard, Progress, Profile) is managed by its own Stack Navigator. This allows for a hierarchical navigation where users can move to more detailed screens and back. For example:

- **Dashboard Stack**:
  - Home (Dashboard)
  - Metric Input/Update: Where users update their metrics.
- **Progress Stack**:
  - Progress Overview
  - Detailed Progress Chart: A deeper dive into a specific metric's progress.
- **Profile Stack** (within Drawer):
  - Profile Overview
  - Edit Profile: Where users can edit their profile details.

