import { dom, library } from "@fortawesome/fontawesome-svg-core";
import * as brands from "@fortawesome/free-brands-svg-icons";
import * as solid from "@fortawesome/free-solid-svg-icons";

const icons: string[] = [
	"faEnvelope", "faCloud", "faBars", "faXmark", "faTrophy", "faRightToBracket",
	"faSpinner", "faHouse", "faAward", "faRightFromBracket", "faPlus", "faUser",
	"faPencil", "faTrash", "faCog", "faBell", "faGauge", "faCircleInfo", "faTicket",
	"faPersonRunning", "faUsers", "faFolderOpen", "faServer", "faBuilding", "faBoxOpen",
	"faPlus", "faArrowLeft"
];

const brandIcons: string[] = [
	"faDiscord", "faYoutube", "faRedditAlien", "faTwitch"
];

export function initFontAwesome() {
	icons.forEach((icon: string) => {
		library.add((solid as any)[ icon ]);
	});

	brandIcons.forEach((icon: string) => {
		library.add((brands as any)[ icon ]);
	});

	dom.watch();
}
