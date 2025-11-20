import java.util.List;

public interface graph {
    void addEdge(int from, int to, int weight);

    void removeEdge(int from, int to);

    boolean isConnected(int from, int to);

    int weightOfEdge(int from, int to);

    List<Edge> neighbours(int v);

    int size();
}
