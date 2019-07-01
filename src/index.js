import React, { Component } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
  AsyncStorage
} from "react-native";

import styles from "./styles";

// import { Container } from './styles';
export default class tictactoe extends Component {
  state = {
    turn: 0,
    won: false,
    whoWin: "",
    //turn 0 = X
    // turn 1 = O
    places: ["", "", "", "", "", "", "", "", ""],
    textFooter: "Start New Game",
    timesPlayed: 0,
    msgTimesPlayed: false,
    placeWon1: null,
    placeWon2: null,
    placeWon3: null
  };

  clique = (turn, pos) => {
    let p = this.state.places;
    const won = this.state.won;

    if (!won) {
      if (p[pos] !== "") {
        this.checkWin(pos);
      } else if (turn == 0) {
        let p = this.state.places.slice();
        p[pos] = "X";
        this.setState(
          { textFooter: "Restart Game", turn: 1, places: p },
          function() {
            this.checkWin(pos);
          }
        );
      } else if (turn == 1) {
        let p = this.state.places.slice();
        p[pos] = "O";
        this.setState(
          { textFooter: "Restart Game", turn: 0, places: p },
          function() {
            this.checkWin(pos);
          }
        );
      }
    } else {
    }
  };

  setWonPlaces = (place1, place2, place3) => {
    this.setState({
      placeWon1: place1,
      placeWon2: place2,
      placeWon3: place3
    });
  };

  checkWin = pos => {
    let p = this.state.places;
    if (p[0] == p[1] && p[0] == p[2] && p[0] != "") {
      console.log("verif 012");
      if (p[0] == "X") {
        this.setWonPlaces(0, 1, 2);
        this.playerWin(1);
      } else if (p[0] == "O") {
        this.setWonPlaces(0, 1, 2);
        this.playerWin(2);
      }
    } else if (p[3] == p[4] && p[3] == p[5] && p[3] != "") {
      console.log("verif 345");
      if (p[3] == "X") {
        this.setWonPlaces(3, 4, 5);
        this.playerWin(1);
      } else if (p[3] == "O") {
        this.setWonPlaces(3, 4, 5);
        this.playerWin(2);
      }
    } else if (p[6] == p[7] && p[6] == p[8] && p[6] != "") {
      console.log("verif 678");
      if (p[6] == "X") {
        this.setWonPlaces(6, 7, 8);
        this.playerWin(1);
      } else if (p[6] == "O") {
        this.setWonPlaces(6, 7, 8);
        this.playerWin(2);
      }
    } else if (p[0] == p[3] && p[0] == p[6] && p[0] != "") {
      console.log("verif 036");
      if (p[0] == "X") {
        this.setWonPlaces(0, 3, 6);
        this.playerWin(1);
      } else if (p[0] == "O") {
        this.setWonPlaces(0, 3, 6);
        this.playerWin(2);
      }
    } else if (p[1] == p[4] && p[1] == p[7] && p[1] != "") {
      console.log("verif 147");
      if (p[1] == "X") {
        this.setWonPlaces(1, 4, 7);
        this.playerWin(1);
      } else if (p[1] == "O") {
        this.setWonPlaces(1, 4, 7);
        this.playerWin(2);
      }
    } else if (p[2] == p[5] && p[2] == p[8] && p[2] != "") {
      console.log("verif 258");
      if (p[2] == "X") {
        this.setWonPlaces(2, 5, 8);
        this.playerWin(1);
      } else if (p[2] == "O") {
        this.setWonPlaces(2, 5, 8);
        this.playerWin(2);
      }
    } else if (p[0] == p[4] && p[0] == p[8] && p[0] != "") {
      console.log("verif 048");
      if (p[0] == "X") {
        this.setWonPlaces(0, 4, 8);
        this.playerWin(1);
      } else if (p[0] == "O") {
        this.setWonPlaces(0, 4, 8);
        this.playerWin(2);
      }
    } else if (p[2] == p[4] && p[2] == p[6] && p[2] != "") {
      console.log("verif 246");
      if (p[2] == "X") {
        this.setWonPlaces(2, 4, 6);
        this.playerWin(1);
      } else if (p[2] == "O") {
        this.setWonPlaces(2, 4, 6);
        this.playerWin(2);
      }
    } else {
      this.draw();
    }
  };

  draw = () => {
    console.log(this.atLeastOneBlank());
    if (!this.atLeastOneBlank()) {
      let times = this.state.timesPlayed;
      this.setState(
        {
          textFooter: "Start New Game",
          won: true,
          whoWin: `It's a Tie`,
          timesPlayed: times + 1
        },
        function() {
          this._storeData();
        }
      );
    } else {
    }
  };

  atLeastOneBlank = () => {
    let p = this.state.places;
    for (let i = 0; i < p.length; i++) {
      if (p[i] === "") {
        return true;
      }
    }
    return false;
  };

  playerWin = winner => {
    let times = this.state.timesPlayed;
    this.setState(
      {
        textFooter: "Start New Game",
        won: true,
        whoWin: `Player ${winner} Wins`,
        timesPlayed: times + 1
      },
      function() {
        this._storeData();
      }
    );
  };

  _storeData = async () => {
    const { timesPlayed } = this.state;
    try {
      await AsyncStorage.setItem("@TimesPlayed", JSON.stringify(timesPlayed));
      this._retrieveData();
    } catch (error) {
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@TimesPlayed");
      if (value !== null) {
        this.setState({ timesPlayed: JSON.parse(value) });
      }
    } catch (error) {}
  };

  wantToReset = () => {
    return Alert.alert(
      "Restart?",
      " Do you want to restart the game?",
      [
        {
          text: "CANCEL",
          onPress: () => {}
        },
        {
          text: "OK",
          onPress: () => {
            this.reset();
          }
        }
      ],
      { cancelable: false }
    );
  };

  reset = () => {
    let p = ["", "", "", "", "", "", "", "", ""];
    this.setState({
      turn: 0,
      won: false,
      whoWin: "",
      places: p,
      textFooter: "Start New Game",
      placeWon1: null,
      placeWon2: null,
      placeWon3: null
    });
  };

  render() {
    const {
      turn,
      won,
      whoWin,
      places,
      timesPlayed,
      msgTimesPlayed,
      placeWon1,
      placeWon2,
      placeWon3
    } = this.state;

    this.componentDidMount = () => {
      this._retrieveData();
    };
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.topBar}>
          <Text
            style={styles.textTopBar}
          >{`Games Played: ${timesPlayed}`}</Text>
        </View>
        {timesPlayed === 5 && !msgTimesPlayed
          ? Alert.alert(
              "You already played 5 games",
              "",
              [
                {
                  text: "OK",
                  onPress: () => {
                    this.setState({ msgTimesPlayed: true });
                  }
                }
              ],
              { cancelable: false }
            )
          : null}
        <View style={styles.rows}>
          <View style={styles.row}>
            <View
              style={
                placeWon1 == 0 || placeWon2 == 0 || placeWon3 == 0
                  ? styles.placeWon
                  : styles.place
              }
            >
              <TouchableOpacity
                style={styles.buttonPlace}
                onPress={() => {
                  this.clique(turn, 0);
                }}
              >
                <Text
                  style={
                    places[0] == "X" ? styles.textPlaceX : styles.textPlaceO
                  }
                >
                  {places[0]}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                placeWon1 == 1 || placeWon2 == 1 || placeWon3 == 1
                  ? styles.placeWon
                  : styles.place
              }
            >
              <TouchableOpacity
                style={styles.buttonPlace}
                onPress={() => {
                  this.clique(turn, 1);
                }}
              >
                <Text
                  style={
                    places[1] == "X" ? styles.textPlaceX : styles.textPlaceO
                  }
                >
                  {places[1]}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                placeWon1 == 2 || placeWon2 == 2 || placeWon3 == 2
                  ? styles.placeWon
                  : styles.place
              }
            >
              <TouchableOpacity
                style={styles.buttonPlace}
                onPress={() => {
                  this.clique(turn, 2);
                }}
              >
                <Text
                  style={
                    places[2] == "X" ? styles.textPlaceX : styles.textPlaceO
                  }
                >
                  {places[2]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View
              style={
                placeWon1 == 3 || placeWon2 == 3 || placeWon3 == 3
                  ? styles.placeWon
                  : styles.place
              }
            >
              <TouchableOpacity
                style={styles.buttonPlace}
                onPress={() => {
                  this.clique(turn, 3);
                }}
              >
                <Text
                  style={
                    places[3] == "X" ? styles.textPlaceX : styles.textPlaceO
                  }
                >
                  {places[3]}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                placeWon1 == 4 || placeWon2 == 4 || placeWon3 == 4
                  ? styles.placeWon
                  : styles.place
              }
            >
              <TouchableOpacity
                style={styles.buttonPlace}
                onPress={() => {
                  this.clique(turn, 4);
                }}
              >
                <Text
                  style={
                    places[4] == "X" ? styles.textPlaceX : styles.textPlaceO
                  }
                >
                  {places[4]}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                placeWon1 == 5 || placeWon2 == 5 || placeWon3 == 5
                  ? styles.placeWon
                  : styles.place
              }
            >
              <TouchableOpacity
                style={styles.buttonPlace}
                onPress={() => {
                  this.clique(turn, 5);
                }}
              >
                <Text
                  style={
                    places[5] == "X" ? styles.textPlaceX : styles.textPlaceO
                  }
                >
                  {places[5]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View
              style={
                placeWon1 == 6 || placeWon2 == 6 || placeWon3 == 6
                  ? styles.placeWon
                  : styles.place
              }
            >
              <TouchableOpacity
                style={styles.buttonPlace}
                onPress={() => {
                  this.clique(turn, 6);
                }}
              >
                <Text
                  style={
                    places[6] == "X" ? styles.textPlaceX : styles.textPlaceO
                  }
                >
                  {places[6]}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                placeWon1 == 7 || placeWon2 == 7 || placeWon3 == 7
                  ? styles.placeWon
                  : styles.place
              }
            >
              <TouchableOpacity
                style={styles.buttonPlace}
                onPress={() => {
                  this.clique(turn, 7);
                }}
              >
                <Text
                  style={
                    places[7] == "X" ? styles.textPlaceX : styles.textPlaceO
                  }
                >
                  {places[7]}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                placeWon1 == 8 || placeWon2 == 8 || placeWon3 == 8
                  ? styles.placeWon
                  : styles.place
              }
            >
              <TouchableOpacity
                style={styles.buttonPlace}
                onPress={() => {
                  this.clique(turn, 8);
                }}
              >
                <Text
                  style={
                    places[8] == "X" ? styles.textPlaceX : styles.textPlaceO
                  }
                >
                  {places[8]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {!won ? (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                if (this.state.textFooter === "Restart Game") {
                  this.wantToReset();
                } else {
                  this.reset();
                }
              }}
            >
              <Text style={styles.bottomText}>{this.state.textFooter}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.footerWin}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                this.reset();
              }}
            >
              <Text style={styles.textWin}>{whoWin}</Text>
              <Text style={styles.bottomText}>{this.state.textFooter}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
