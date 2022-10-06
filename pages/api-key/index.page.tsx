import { HeaderFC } from "components/Header/HeaderFC";
import { Container } from "react-bootstrap";
import { AdminstrationCard } from "components/AdministrationCard/AdministrationCard";
import { Flex } from "components/Flex/Flex";
import { Input } from "components/InputField/Input";
import { Modal } from "components/Modal/Modal";
import { useAPIContext } from "providers/APIProvider";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { showToast } from "services/ToastService/ToastService";
import { Loading } from "components/Loading";
import { Motion } from "components/PageMotion/PageMotion";

export default () => {
  return (
    <div className="main-content">
      <HeaderFC title="API key" />
      <Container fluid>
        <p className="text-muted">Here you can see and reset your API key.</p>
        <APIKeysView />
      </Container>
    </div>
  );
};

const APIKeysView = () => {
  const { apiService } = useAPIContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  const [apiKey, setApiKey] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiService.getAPIKey().then(setApiKey);
  }, [apiService]);

  async function handleResetAPIKey() {
    try {
      setLoading(true);
      setModalVisible(false);
      await apiService.resetAPIKey().then(setApiKey);
      showToast({ text: "API key changed.", type: "success" });
    } catch (error) {
      showToast({
        text: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  if (!apiKey) return <Loading />;

  return (
    <Motion>
      <AdminstrationCard>
        <Flex gap={1} alignItems="flex-end" wrap>
          <div style={{ width: "25rem" }}>
            <Input
              onClick={() => {
                !apiKeyVisible && setApiKeyVisible((visible) => !visible);
              }}
              style={{ cursor: apiKeyVisible ? "auto" : "pointer" }}
              type={apiKeyVisible ? "text" : "password"}
              readonly
              name="currentPass"
              value={apiKey}
              onValueChange={() => {}}
              label="Current API key"
              placeholder="Enter your current password"
              error={undefined}
            />
          </div>
          <Flex gap={1}>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(apiKey);
              }}
            >
              Copy
            </Button>
            <Button
              style={{ position: "relative" }}
              onClick={() => setModalVisible(true)}
              disabled={loading}
              className="btn-light"
            >
              Reset
            </Button>
          </Flex>
        </Flex>
        <div className="mt-5">
          <p>Copy your API key and enter it to the <b>Authorization</b> field of our endpoints, for example:</p>
          <ul className="mb-0">
            <li><a href="https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTI-retrieve-all-nf-ts" target="_blank" rel="noopener noreferrer">Retrieve all NFTs on a chain</a></li>
            <li><a href="https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzM-retrieve-nf-ts-owned-by-an-account" target="_blank" rel="noopener noreferrer">Retrieve NFTs owned by an account</a></li>
            <li><a href="https://docs.nftport.xyz/docs/nftport/b3A6Njg1NTI0Mjc-easy-minting-w-file-upload" target="_blank" rel="noopener noreferrer">Easy mint an NFT with file upload</a></li>
          </ul>
        </div>
      </AdminstrationCard>
      <Modal
        modalTitle="Confirm API key reset"
        title="Are you sure you want to reset the API Key?"
        subtitle=" If you reset, any requests made by application using the previous API key will be rejected."
        show={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <Flex gap={1}>
          <Button className="btn-light" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>
          <Button className="btn-danger" onClick={handleResetAPIKey}>
            Reset
          </Button>
        </Flex>
      </Modal>
    </Motion>
  );
};
