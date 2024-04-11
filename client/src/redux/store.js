import { configureStore } from "@reduxjs/toolkit";
import authModalSlice from "./features/authModalSlice";
import appStateSlice from "./features/appStateSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModeSlice from "./features/themeModeSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
	reducer: {
		user: userSlice,
		themeMode: themeModeSlice,
		authModal: authModalSlice,
		globalLoading: globalLoadingSlice,
		appState: appStateSlice
	}
})

export default store;