FROM slogive/apk-gradlew-builder:20.18.1-slim-android

WORKDIR /apk

COPY . .

RUN \
  # Install deps
  bun i \
  # Clean android folder
  && \
  bun run clean \
  # Build vite project
  && \ 
  bunx vite build --emptyOutDir \
  # Add android platform
  && \ 
  bunx cap add android \
  # Generate assets
  && \ 
  bunx capacitor-assets generate \
  # Add android platform
  && \ 
  bunx cap copy android \
  # Build
  && \ 
  cd android && ./gradlew assembleRelease \
  # Create a folder for outputs
  && \ 
  mkdir /outputs \
  && cp /apk/android/app/build/outputs/apk/release/app-release-unsigned.apk /outputs/app-release.apk