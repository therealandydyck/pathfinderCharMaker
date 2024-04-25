## Pathfinder Character Sheet app

### Dependencies
- expo-router
- expo-sqlite


### Notes/Bugs/Issues
***
Saves Character data for your character sheet.
TODO: Add inventory, equipment, automatic stat bonuses, stat rolling/allocation within app, export to printable character sheet, and more

While SQLite makes database usage much easier, there are issues with getting the database to close properly. If that happens, clearing the App cache and/or restarting the app will usually fix this.

Currently navigation is handled via expo-router.  The stack method does not play nice with the SQLite database issue, so I have tried some workarounds, but I will likely look at another navigation solution. An example would be getting pages to update when going back to previous pages.

***