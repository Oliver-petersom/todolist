import java.util.ArrayList;
import java.util.List;

import java.util.ArrayList;
import java.util.List;

public class Graph_impl2 implements graph {
    private Graph_impl graph;

    public Graph_impl2(int n){
        graph = new Graph_impl(n);
    }

    @Override
    public void addEdge(int from, int to, int weight) {
        graph.addEdge(from, to, weight);
        graph.addEdge(to, from, weight);
    }

    @Override
    public void removeEdge(int from, int to) {
        graph.removeEdge(from, to);
        graph.removeEdge(to, from);
    }

    @Override
    public boolean isConnected(int from, int to) {
        return graph.isConnected(from, to);
    }

    @Override
    public int weightOfEdge(int from, int to) {
        return graph.weightOfEdge(from, to);
    }

    @Override
    public List<Edge> neighbours(int v) {
        return graph.neighbours(v);
    }

    @Override
    public int size() {
        return graph.size();
    }
}


