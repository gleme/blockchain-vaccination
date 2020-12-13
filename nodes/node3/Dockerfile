FROM ethereum/client-go

WORKDIR /root/ethereum

COPY password static-nodes.json* /root/ethereum/
COPY keystore /root/ethereum/keystore
COPY geth /root/ethereum/geth

ENTRYPOINT []

EXPOSE 30313 30313/udp
