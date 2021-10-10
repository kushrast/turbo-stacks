import { v4 as uuidv4 } from 'uuid';

class StorageClient {
	constructor(){}
	createNewInstaList(title, listItems){}
	getInstaList(listId){}
}

class LocalStorageClient extends StorageClient {
	getLocalStorage = () => {
		if (typeof(Storage) !== "undefined") {
		  return window.localStorage;
		} else {
		  return null;
		}
	}

	createNewInstaList = (title, listItems) => {
		var storage = this.getLocalStorage();
		if (storage != null) {
			var listId = uuidv4();
			var creationTimestampMs = new Date().getTime();

			var currentLists;
			var currentListsAsString = storage.getItem("lists");

			if (currentListsAsString == null) {
				currentLists = {};
			} else {
				currentLists = JSON.parse(currentListsAsString);
			}

			currentLists[listId] = {"title": title, "items": listItems, "creationTimestampMs": creationTimestampMs}

			storage.setItem("lists", JSON.stringify(currentLists));

			return listId;
		}
		return "";
	}

	getInstaList = (listId) => {
		var storage = this.getLocalStorage();
		if (storage != null) {
			var currentLists;
			var currentListsAsString = storage.getItem("lists");

			if (currentListsAsString == null) {
				currentLists = {};
			} else {
				currentLists = JSON.parse(currentListsAsString);
			}

			return currentLists[listId];
		}
		return {};
	}
}

var localStorageClient = new LocalStorageClient();

export const createNewInstaList = localStorageClient.createNewInstaList;
export const getInstaList = localStorageClient.getInstaList;