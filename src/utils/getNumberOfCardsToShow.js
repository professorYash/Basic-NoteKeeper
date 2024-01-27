function getNumberOfCardsToShow(screenWidth) {
  if (screenWidth >= 1200) {
    return 8; // for bigger screens
  } else if (screenWidth >= 768) {
    return 6;
  } else {
    return 4;
  }
}

export default getNumberOfCardsToShow;