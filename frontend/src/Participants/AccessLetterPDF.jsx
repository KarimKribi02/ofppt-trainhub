// AccessLetterPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../assets/logo.png'; // chemin vers ton logo OFPPT

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 40,
    lineHeight: 1.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    marginBottom: 20,
  },
  signature: {
    marginTop: 40,
    textAlign: 'right',
  },
});

const AccessLetterPDF = ({ formation, user }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={logo} />
        <Text>Date : {new Date().toLocaleDateString()}</Text>
      </View>

      <Text style={styles.title}>Demande d’accès à la formation</Text>

      <View style={styles.content}>
        <Text>À qui de droit,</Text>
        <Text>
          Je soussigné(e) {user?.nom+" "+user?.prenom || '__________'}, formateur/formatrice à l’OFPPT,
          sollicite l’autorisation de participer à la formation intitulée : "{formation.titre}".
        </Text>

        <Text>
          Celle-ci se déroulera du {formation.dateDebut} au {formation.dateFin}, à {formation.lieux}, dans le cadre de la filière {formation.filières}.
        </Text>

        <Text>
          Cette formation est animée par : {formation.formateurs_animateurs}, et se fera selon le mode : {formation.mode}.
        </Text>

        <Text>
          Elle vise à renforcer nos compétences pédagogiques et techniques, et contribuera significativement à l’amélioration de la qualité de l’enseignement dispensé à nos stagiaires.
        </Text>

        <Text>
          En espérant une réponse favorable à cette requête, veuillez agréer, Madame, Monsieur, l’expression de mes salutations distinguées.
        </Text>
      </View>

      <Text style={styles.signature}>
        Signature : ___________________
      </Text>
    </Page>
  </Document>
);

export default AccessLetterPDF;
