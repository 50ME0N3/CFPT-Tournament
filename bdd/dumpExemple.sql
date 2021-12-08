-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 27 oct. 2021 à 18:03
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

INSERT INTO `game` (`idGame`, `name`, `gameLogo`) VALUES
(1, 'Counter-Strike : Global Offensive', ''),
(2, 'Valorant', ''),
(3, 'Minecraft', ''),
(4, 'League of Legends', ''),
(5, 'Trackmania', '');

INSERT INTO `team` (`idTeam`, `name`, `discordId`) VALUES
(1, 'team1', '898200807575552070'),
(2, 'team2', '898200807575552071'),
(3, 'team3', '898200807575552072');

INSERT INTO `player` (`idPlayer`, `nickname`, `discordId`, `dateRegistration`, `idTeam`) VALUES
(6, 'player1', '216579235576498091', '2021-10-27 15:47:33', 1),
(7, 'player2', '216579235576498092', '2021-10-27 15:47:33', 1),
(8, 'player3', '216579235576498093', '2021-10-27 15:47:33', 1),
(9, 'player4', '216579235576498094', '2021-10-27 15:47:33', 1),
(10, 'player5', '216579235576498095', '2021-10-27 15:47:33', 1),
(11, 'player6', '216579235576498096', '2021-10-27 15:49:20', 2),
(12, 'player7', '216579235576498097', '2021-10-27 15:49:20', 2),
(13, 'player8', '216579235576498098', '2021-10-27 15:49:20', 2),
(14, 'player9', '216579235576498099', '2021-10-27 15:49:20', 2),
(15, 'player10', '216579235576498170', '2021-10-27 15:49:20', 2),
(16, 'player11', '216579235576498171', '2021-10-27 15:50:38', 3),
(17, 'player12', '216579235576498172', '2021-10-27 15:50:38', 3),
(18, 'player13', '216579235576498173', '2021-10-27 15:50:38', 3),
(19, 'player14', '216579235576498174', '2021-10-27 15:50:38', 3),
(20, 'player15', '216579235576498175', '2021-10-27 15:50:38', 3);

INSERT INTO `match` (`idMatch`, `date`, `idTeamA`, `idTeamB`) VALUES
(1, '2021-10-30 08:00:00', 1, 2),
(2, '2021-10-30 09:00:00', 2, 3);

INSERT INTO `gameplayed` (`idGamePlayed`, `scoreA`, `scoreB`, `idGame`, `idMatch`) VALUES
(1, 16, 10, 1, 1),
(2, 3, 4, 4, 1),
(3, 1, 0, 5, 1),
(4, 10, 9, 3, 2),
(5, 1, 0, 5, 2),
(6, 2, 0, 2, 2);
