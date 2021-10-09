import { v4 as uuidv4 } from 'uuid';

class StorageClient {
	constructor(){}
	createNewList(title, listItems){}
}

class LocalStorageClient extends StorageClient {
	getLocalStorage = () => {
		if (typeof(Storage) !== "undefined") {
		  return window.localStorage;
		} else {
		  return null;
		}
	}

	createNewList = (title, listItems) => {
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
}

var localStorageClient = new LocalStorageClient();

export const createNewList = localStorageClient.createNewList;