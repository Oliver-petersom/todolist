import java.util.ArrayList;
import java.util.List;

public class Graph_impl implements graph {
    private List<Edge>[] graph;

    @SuppressWarnings("unchecked")
    public Graph_impl(int n){
        graph = new List[n];
        for(int i = 0; i < n; i++){
            graph[i] = new ArrayList<>();
        }
    }

    @Override
    public void addEdge(int from, int to, int weight) {
        graph[from].add(new Edge(to, weight));
    }

    @Override
    public void removeEdge(int from, int to) {
        for(int i = 0; i < graph[from].size(); i++){
            if(graph[from].get(i).to == to){
                graph[from].remove(i);
                break;
            }
        }
    }

    @Override
    public boolean isConnected(int from, int to) {
        for(int i = 0; i < graph[from].size(); i++){
            if(graph[from].get(i).to == to){
                return true;
            }
        }
        return false;
    }

    @Override
    public int weightOfEdge(int from, int to) {
        for(int i = 0; i < graph[from].size(); i++){
            if(graph[from].get(i).to == to){
                return graph[from].get(i).weight;
            }
        }
        throw new IllegalArgumentException("No such edge");
    }

    @Override
    public List<Edge> neighbours(int v) {
        return graph[v];
    }

    @Override
    public int size() {
        return graph.length;
    }
}
