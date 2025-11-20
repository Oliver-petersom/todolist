public class DFS_Edge {
    void traverseEdges(Graph_impl graph, int s, boolean[][] visited){
        if(s < 0 || s >= graph.size())return;
        for(Edge e : graph.neighbours(s)){
            if(visited[s][e.to])continue;
            visited[s][e.to] = true;
            traverseEdges(graph, e.to, visited);
        }
    }
}
