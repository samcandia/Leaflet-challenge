# Background

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, I have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

# Steps Taken

1) Gathered dataset at the  [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). The USGS provides earthquake data in a number of different formats, updated every 5 minutes.

2) Imported and visualized the data by doing the following:

    - Using Leaflet, created a map that plots all the earthquakes from the dataset based on their longitude and latitude.

    - Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.
  
   <img width="811" alt="image" src="https://github.com/samcandia/Leaflet-challenge/assets/145384304/ec8dc29a-2dee-4669-b84e-295366e25a2c">
