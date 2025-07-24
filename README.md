# Verdana

## Description / Présentation

**Verdana** est une application mobile innovante qui permet de suivre l’état de vos plantes d’intérieur grâce à des capteurs connectés, un chatbot d’assistance et un système de notifications intelligentes. L’application centralise la gestion, le suivi et l’aide à l’entretien des plantes pour tous les passionnés de végétal, du débutant à l’expert.

![Logo Verdana](front/assets/verdana.png)

## Table des matières

- [Technologies](#technologies)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Installation](#installation)
- [Démarrage rapide (avec le front commenté dans Docker Compose)](#démarrage-rapide-avec-le-front-commenté-dans-docker-compose)
- [Utilisation](#utilisation)
- [Tests](#tests)
- [Documentation](#documentation)
- [Contribuer](#contribuer)
- [Licence](#licence)
- [Contact](#contact)

## Technologies

| Frontend         | Backend                | IoT/Capteurs      | Base de données | Notifications |
|------------------|-----------------------|-------------------|-----------------|---------------|
| React Native     | Node.js / Express      | Arduino ESP32     | postgreSQL    | Firebase FCM  |
| Expo             | NestJS (microservices) | DHT, photoresistor|                 |               |

## Fonctionnalités

| Fonctionnalité                | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| Suivi capteurs                | Température, humidité, luminosité en temps réel                             |
| Chatbot d’assistance          | Conseils personnalisés pour l’entretien des plantes                         |
| Notifications push            | Alertes sur l’état des plantes et rappels d’arrosage                       |
| Gestion du compte utilisateur | Inscription, connexion, modification et suppression du compte               |
| Ajout et suivi de plantes     | Ajout de nouvelles plantes, affichage des données et historique             |
| Support & tutoriel            | Contact support et tutoriel d’utilisation                                   |

## Architecture

Le projet est organisé en microservices pour une meilleure scalabilité et maintenabilité :

- **Front** : Application mobile React Native (Expo)
- **API** : Gateway et services REST (Node.js, Express, NestJS)
- **Chatbot-service** : Conseils automatisés et FAQ
- **Sensor-service** : Collecte et traitement des données capteurs
- **Notification-service** : Envoi de notifications push (Firebase FCM)
- **User-service** : Gestion des utilisateurs et authentification
- **Recommendation-service** : Suggestions personnalisées pour l’entretien
- **Base de données** : PostgreSQL

Voir le schéma d’architecture dans [`doc/wireframe/`](doc/wireframe/).

## Installation

### Prérequis

- Node.js >= 16.x
- npm >= 8.x
- Expo CLI (`npm install -g expo-cli`)
- Docker (optionnel, pour le déploiement des microservices)
- Un smartphone ou émulateur pour tester l’application mobile

### Clonage du projet

```bash
git clone https://rendu-git.etna-alternance.net/module-10017/activity-53608/group-1056566.git
cd verdana/group-1056566
```

### Lancer les services backend

```bash
docker-compose up --build
```
Ou, pour chaque service individuellement :

```bash
cd sensor-service
npm install
npm start
```

### Lancer le frontend mobile

```bash
cd front
npm install
expo start
```

---

## Démarrage rapide (avec le front commenté dans Docker Compose)

1. **Lance les services backend en arrière-plan :**
   ```bash
   docker compose up --build -d
   ```
2. **Démarre le front localement :**
   ```bash
   cd front
   npx expo start --tunnel
   ```

> Le flag `--tunnel` permet d’accéder à l’application mobile depuis un appareil sur le même réseau, même si tu n’es pas sur le même Wi-Fi.

---

## Utilisation

1. **Créer un compte** ou se connecter via l’application mobile.
2. **Ajouter vos plantes** et associer les capteurs connectés.
3. **Consulter les données** en temps réel (température, humidité, luminosité).
4. **Recevoir des notifications** pour l’entretien (arrosage, alerte sécheresse, etc.).
5. **Utiliser le chatbot** pour obtenir des conseils personnalisés.
6. **Consulter l’historique** et les recommandations pour chaque plante.

---

## Tests

Chaque microservice possède ses propres tests unitaires et d’intégration.

```bash
cd sensor-service
npm test
```

## Documentation

- [Swagger API](doc/Swagger.yaml) – Documentation interactive de l’API REST
- [Fiche Projet](doc/Fiche_Projet.pdf) – Présentation synthétique du projet
- [Wireframes](doc/wireframe/) – Maquettes de l’application
- [Base de données](doc/database.pdf) – Modélisation et schéma de la base

## Contribuer

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/ma-feature`)
3. Commitez vos modifications (`git commit -am 'Ajout d’une nouvelle fonctionnalité'`)
4. Poussez la branche (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

Merci de consulter le fichier `CONTRIBUTING.md` s’il existe, ou contactez l’équipe pour toute question.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE).

## Contact

Pour toute suggestion, question ou bug, n’hésitez pas à ouvrir une issue ou à contacter l’équipe via le dépôt GitHub.