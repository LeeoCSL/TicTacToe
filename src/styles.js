import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    width: "100%",
    height: 30,
    backgroundColor: "#aaa"
  },
  textTopBar: {
    alignSelf: "flex-end",
    fontSize: 20,
    marginRight: 10
  },
  rows: {
    flex: 2,
    flexDirection: "column"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  place: {
    backgroundColor: "#fff",
    flex: 1,
    borderWidth: 1,
    borderColor: "#000"
  },
  placeWon: {
    backgroundColor: "#0f0",
    flex: 1,
    borderWidth: 1,
    borderColor: "#000"
  },
  buttonPlace: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textPlace: {
    fontSize: 80,
    alignSelf: "center"
  },
  textPlaceX: {
    fontSize: 80,
    alignSelf: "center",
    color: "#00f"
  },
  textPlaceO: {
    fontSize: 80,
    alignSelf: "center",
    color: "#f00"
  },
  footer: {
    width: "100%",
    height: 30,
    backgroundColor: "#aaa"
  },
  footerWin: {
    width: "100%",
    height: 60,
    backgroundColor: "#aaa"
  },
  textWin: {
    alignSelf: "center",
    fontSize: 20
  },
  bottomButton: {
    alignSelf: "center"
  },
  bottomText: {
    fontSize: 20
  }
});

export default styles;
