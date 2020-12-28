FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /api

# Copy csproj and restore as distinct layers
COPY *.sln .
COPY API/*.csproj ./API/
COPY Data/*.csproj ./Data/
COPY Models/*.csproj ./Models/
COPY Tests/*.csproj ./Tests/
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o publish API/

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
ARG API_PORT=5000
EXPOSE ${API_PORT}
ENV ASPNETCORE_URLS=http://+:${API_PORT}/
WORKDIR /api
COPY --from=build-env /api/publish .
ENTRYPOINT ["dotnet", "API.dll"]