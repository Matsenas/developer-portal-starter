import { Flex } from "components/Flex/Flex";
import { useRouter } from "next/router";
import { useAPIContext } from "providers/APIProvider";
import { useUser } from "providers/UserProvider";
import { useCallback } from "react";
import { Pages } from "routes/Routes";
import { showToast } from "services/ToastService/ToastService";

export const SidebarFooter = () => {
  const { stats, onDidLogout } = useUser();
  const { apiService } = useAPIContext();
  const router = useRouter();
  const userEmail = stats ? stats.profile.name : "...";

  const handleSignout = useCallback(async () => {
    try {
      await apiService.signOut();
      router.push(Pages.SIGN_IN).then(() => {
        onDidLogout();
        showToast({ text: "Sign out successful.", type: "info" });
      });
    } catch (error) {
      showToast({
        text: "Sign out failed. Check your connection and try again.",
        type: "error",
      });
    }
  }, [apiService, router, onDidLogout]);

  return (
    <Flex column alignItems="center">
      <p className="text-muted mb-2">{userEmail}</p>
      <button className="btn btn-default no-hover" onClick={handleSignout}>
        <div className="text-muted" style={{ color: "red" }}>
          <Flex alignItems="center" justifyContent="center" gap={0}>
            <img className="p-1" src="/img/signOut.svg" alt="Sign Out" />
            <div>Sign Out</div>
          </Flex>
        </div>
      </button>
    </Flex>
  );
};
