
export const MESSAGES_FORMAT = {
    newGame: (playerName) => {
        return JSON.stringify({
            action: {
                name: 'newGame',
                parameters: {
                    playerName: playerName
                }
            }
        })
    },

    saveGame: () => {
        return JSON.stringify({
            action: {
                name: 'saveGame',
                parameters: {
                    gameId: 1
                }
            }
        })
    },

    joinGame: (playerName, gameId) => {
        return JSON.stringify({
            action: {
                name: 'joinGame',
                parameters: {
                    gameId: gameId,
                    playerName: playerName
                }
            }
        })
    },

    connectToGame: (playerName, teamSide, planesType, gameId) => {
        return JSON.stringify({
            action: {
                name: 'connectToGame',
                parameters: {
                    gameId: gameId,
                    playerName: playerName,
                    teamSide: teamSide,
                    planesType: planesType
                }
            }
        })
    },

    syncWithEnemy: () => {
        return JSON.stringify({
            action: {
                name: 'syncWithEnemy',
                parameters: {
                    gameId: context.gameId,
                    playerName: context.playerSession.name
                }
            }
        })
    },

    syncGame: () => {
        return JSON.stringify({
            action: {
                name: 'syncGame',
                parameters: {
                    gameId: context.gameId,
                    playerName: context.playerSession.name
                }
            }
        })
    },

    syncMove(planeOne, planeTwo, planeThree, planeFour) {
		return JSON.stringify({
			action: {
				name: 'syncMove',
				parameters: {
					gameId: context.gameId,
					playerName: context.playerSession.name,
					planeOne: planeOne,
					planeTwo: planeTwo,
					planeThree: planeThree,
					planeFour: planeFour
				}
			}
		})
	},

	syncShoot(selectedPlaneIndex) {
		return JSON.stringify({
			action: {
				name: 'syncShoot',
				parameters: {
					gameId: context.gameId,
                    playerName: context.playerSession.name,
					shootingPlane: selectedPlaneIndex
				}
			}
		})
	},

	syncBomb(selectedPlaneIndex) {
		return JSON.stringify({
			action: {
				name: 'syncBomb',
				parameters: {
					gameId: context.gameId,
                    playerName: context.playerSession.name,
					bombingPlane: selectedPlaneIndex
				}
			}
		})
	}
};